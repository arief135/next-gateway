// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ProxyService } from '@/lib/ProxyService'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const query = req.query.proxy as string[]

    console.log(query)

    if (query.length < 2) {
        res.status(400).write('No system id specified')
        res.end()
        return
    }

    const sId = query[1]

    try {
        const proxyService = new ProxyService(sId)

        const requestUrl = query.slice(2).join('/')
        const destUrl = proxyService.mapUrl(requestUrl)

        console.log(destUrl)
    } catch (error: any) {
        res.status(400).write(error.message)
        res.end()
        return
    }


    res.end()

    // let destination = process.env.SAP_HOST

    // if (Array.isArray(query)) {
    //     destination = destination + '/' + query.join('/')
    // } else {
    //     destination = destination + '/' + query
    // }

    // const queryString = { ...req.query }
    // delete queryString.sap

    // const headers = { ...req.headers }
    // delete headers.host

    // const requestProp = {
    //     url: destination,
    //     headers: headers,
    //     method: req.method,
    //     params: queryString,
    // }

    // try {
    //     const axiosResponse = await axios.request(requestProp)

    //     Object.keys(axiosResponse.headers).forEach((k) => {
    //         res.setHeader(k, axiosResponse.headers[k])
    //     })

    //     res.status(axiosResponse.status).send(axiosResponse.data)
    // } catch (error: any) {
    //     Object.keys(error.response.headers).forEach((k) => {
    //         res.setHeader(k, error.response.headers[k])
    //     })

    //     res.status(error.response.status)
    //         .send(error.response.data)
    // }
}
