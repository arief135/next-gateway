import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { i18n } from "../i18n"
import { ProxySystem, ProxySystemMap, QueryString } from "../models/ProxySystem"

export class ProxyService {

    private sId: string
    private sysDetails: ProxySystem

    constructor(sId: string) {
        if (sId in ProxySystemMap) {
            this.sId = sId
            this.sysDetails = ProxySystemMap[this.sId]
        } else {
            throw new Error(i18n.__('SYSTEM_ID_NOT_FOUND', sId))
        }
    }

    public mapUrl(path: string, queries: QueryString) {
        const url = new URL(this.sysDetails.baseUrl + '/' + path)

        for (const key in this.sysDetails.queryString) {
            url.searchParams.set(key, this.sysDetails.queryString[key])
        }

        for (const key in queries) {
            url.searchParams.set(key, queries[key])
        }

        return url.toString()
    }

    public async send(req: NextApiRequest, res: NextApiResponse) {
        const path = req.query.proxy as string[]
        const requestUrl = path.slice(2).join('/')
        const queryString = { ...req.query } as QueryString
        delete queryString.proxy

        const headers = { ...req.headers }
        delete headers.host

        const requestProp = {
            url: this.mapUrl(requestUrl, queryString),
            headers: headers,
            method: req.method,
        }

        try {
            const axiosResponse = await axios.request(requestProp)

            Object.keys(axiosResponse.headers).forEach((k) => {
                res.setHeader(k, axiosResponse.headers[k])
            })

            res.status(axiosResponse.status).send(axiosResponse.data)
        } catch (error: any) {

            if (error.response !== undefined) {
                Object.keys(error.response.headers).forEach((k) => {
                    res.setHeader(k, error.response.headers[k])
                })

                res.status(error.response.status).send(error.response.data)
            } else {
                res.status(500).send(error.message)
            }
        }
    }
}