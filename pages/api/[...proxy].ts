// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ProxyService, QueryString } from '@/src/services/proxy.service'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const query = req.query.proxy as string[]

    if (query.length < 2) {
        res.status(400).send('No system id specified')
        return
    }

    const sId = query[1]

    try {
        const proxyService = new ProxyService(sId)
        await proxyService.send(req, res)
    } catch (error: any) {
        res.status(400).send(error.message)
        return
    }

    res.end()
}
