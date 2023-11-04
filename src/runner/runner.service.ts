import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express'
import { Agent } from 'node:https';
import { ProxiesService } from 'src/proxies/proxies.service';
import fetch from 'node-fetch'

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
        url.pathname += req.params[0]
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                const element = req.query[key] as string;
                url.searchParams.set(key, element)
            }
        }

        // const headers = { ...req.headers }
        // delete headers.host
        // delete headers.authorization
        // delete headers.connection

        // const requestProp: AxiosRequestConfig = {
        //     url: url.href,
        //     headers: headers,
        //     method: req.method,
        //     httpsAgent: new Agent({
        //         rejectUnauthorized: false,
        //         requestCert: false
        //     }),
        //     auth: {
        //         username,
        //         password
        //     },
        // }

        // const result = await this.httpService.axiosRef.request(requestProp)
        // console.log(requestProp.headers)
        // const result = this.httpService.get(
        //     'https://vhptrds4ci.sap.adhi.co.id:44300/sap/opu/odata/sap/API_BUSINESS_PARTNER',
        //     {
        //         auth: {
        //             username,
        //             password
        //         },
        //         httpsAgent: new Agent({
        //             rejectUnauthorized: false,
        //             requestCert: false
        //         }),
        //     })


        const headers = {}

        for (const key in req.headers) {
            const value = req.headers[key];
            headers[key] = value
        }

        headers['authorization'] = 'Basic ' + btoa(`${username}:${password}`)

        return await fetch(
            url.href,
            {
                headers: headers,
                agent: new Agent({
                    rejectUnauthorized: false,
                    requestCert: false
                })
            })
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
