import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express'
import { Agent } from 'node:https';
import { ProxiesService } from 'src/proxies/proxies.service';
import fetch, { RequestInit } from 'node-fetch'
import { TraceService, TraceStep } from 'src/trace/trace.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class RunnerService {
    constructor(
        private proxiesService: ProxiesService,
        private traceService: TraceService) { }

    async run(dest: string, req: Request, res: Response) {

        const pProxy = this.proxiesService.findByName(dest)
        const props = await pProxy.credential().CredentialProperties()
        const username = props.find(e => e.name == 'USERNAME').value
        const password = props.find(e => e.name == 'PASSWORD').value
        const proxy = await pProxy

        const event1 = this.traceService.addEntry({
            sequence: randomUUID(),
            byUser: req[ 'user' ].username,
            eventDate: new Date(),
            header: JSON.stringify(req.headers),
            payload: JSON.stringify(req.body),
            contentType: req.headers[ 'content-type' ] ?? '',
            proxy: (await pProxy).uuid,
            stepName: TraceStep.REQUEST_RECEIVED,
            stepNo: 1
        })

        // construct url
        const url = new URL(proxy.targetURL)

        if (url.pathname.endsWith('/')) {
            url.pathname = url.pathname.substring(0, url.pathname.length - 1)
        }

        url.pathname += req.params[ 0 ]

        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                const element = req.query[ key ] as string;
                url.searchParams.set(key, element)
            }
        }

        const headers = {}

        for (const key in req.headers) {
            const value = req.headers[ key ];
            headers[ key ] = value
        }

        headers[ 'authorization' ] = 'Basic ' + btoa(`${username}:${password}`)

        delete headers[ 'host' ]

        const requestInit: RequestInit = {
            method: req.method,
            headers: headers,
            agent: new Agent({
                rejectUnauthorized: false,
                requestCert: false
            })
        }

        if ([ 'POST', 'PUT', 'PATCH' ].includes(req.method)) {
            requestInit.body = JSON.stringify(req.body)
        }

        const event2 = this.traceService.addEntry({
            sequence: (await event1).sequence,
            byUser: req[ 'user' ].username,
            eventDate: new Date(),
            header: JSON.stringify(requestInit.headers),
            payload: (requestInit.body as string) ?? '',
            contentType: requestInit.headers[ 'content-type' ] ?? '',
            proxy: (await pProxy).uuid,
            stepName: TraceStep.REQUEST_REWRITE,
            stepNo: 2
        })

        // send request
        const result = await fetch(url.href, requestInit)
        const resultHeaders = result.headers.raw()
        const payload = await result.text()

        delete resultHeaders[ 'content-encoding' ]

        for (const key in resultHeaders) {
            const value = resultHeaders[ key ];
            res.setHeader(key, value)
        }

        res.statusCode = result.status
        res.statusMessage = result.statusText
        res.send(payload)

        let resultContentType = ''
        if (resultHeaders[ 'content-type' ] && resultHeaders[ 'content-type' ].length > 0) {
            resultContentType = resultHeaders[ 'content-type' ][ 0 ]
        }

        const event3 = this.traceService.addEntry({
            sequence: (await event1).sequence,
            byUser: req[ 'user' ].username,
            eventDate: new Date(),
            header: JSON.stringify(resultHeaders),
            payload: payload,
            contentType: resultContentType,
            proxy: (await pProxy).uuid,
            stepName: TraceStep.RESPONSE_RECEIVED,
            stepNo: 3
        })

        await Promise.all([ event1, event2, event3 ])
    }

    async testConnection(targetURL: string, username: string, password: string, ignoreCert = false) {

        let agent = undefined
        if (ignoreCert) {
            agent = new Agent({
                rejectUnauthorized: false,
                requestCert: false
            })
        }

        return await axios.request({
            method: 'GET',
            url: targetURL,
            auth: {
                username,
                password
            },
            httpsAgent: agent
        })
    }
}
