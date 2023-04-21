// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { JWT } from '@/src/services/jwt.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method != 'POST') {
        res.status(400).send('Method not supported')
        return
    }

    const jwt = new JWT()
    res.status(200).json(jwt.getToken(''))
}
