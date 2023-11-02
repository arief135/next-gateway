import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express'
import { Agent } from 'node:https';
import { ProxiesService } from 'src/proxies/proxies.service';

@Injectable()
export class RunnerService {
    constructor(private proxiesService: ProxiesService) { }

    async run(dest: string, req: Request, res: Response) {

        const proxy = await this.proxiesService.findByName(dest)

        // construct url
        const url = new URL(proxy.targetURL)
        url.pathname += req.params[0]
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                const element = req.query[key] as string;
                url.searchParams.set(key, element)
            }
        }

        const headers = { ...req.headers }
        delete headers.host

        const requestProp = {
            url: url.href,
            headers: headers,
            method: req.method
        }

        return await axios.request(requestProp)
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
