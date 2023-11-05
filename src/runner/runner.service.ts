import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express'
import { Agent } from 'node:https';
import { ProxiesService } from 'src/proxies/proxies.service';
import fetch, { RequestInit } from 'node-fetch'

@Injectable()
export class RunnerService {
    constructor(private proxiesService: ProxiesService, private httpService: HttpService) { }

    async run(dest: string, req: Request, res: Response) {

        const pProxy = this.proxiesService.findByName(dest)
        const props = await pProxy.credential().CredentialProperties()
        const username = props.find(e => e.name == 'USERNAME').value
        const password = props.find(e => e.name == 'PASSWORD').value
        const proxy = await pProxy

        // construct url
        const url = new URL(proxy.targetURL)

        if (url.pathname.endsWith('/')) {
            url.pathname = url.pathname.substring(0, url.pathname.length - 1)
        }

        url.pathname += req.params[0]

        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                const element = req.query[key] as string;
                url.searchParams.set(key, element)
            }
        }

        const headers = {}

        for (const key in req.headers) {
            const value = req.headers[key];
            headers[key] = value
        }

        headers['authorization'] = 'Basic ' + btoa(`${username}:${password}`)

        delete headers['host']

        const requestInit: RequestInit = {
            method: req.method,
            headers: headers,
            agent: new Agent({
                rejectUnauthorized: false,
                requestCert: false
            })
        }

        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            requestInit.body = JSON.stringify(req.body)
        }

        // console.log(url.href)
        // console.log(req.body)
        // console.log(requestInit)

        return await fetch(url.href, requestInit)
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
