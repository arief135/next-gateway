// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { i18n } from '@/src/i18n'
import { ProxyService } from '@/src/services/proxy.service'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const query = req.query.proxy as string[]

    if (query.length < 2) {
        res.status(400).send(i18n.__('NO_SYSTEM_ID_SPECIFIED')) 
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
