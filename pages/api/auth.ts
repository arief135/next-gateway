// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { JWT } from '@/src/services/jwt.service'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import { getUser } from '@/src/models/User';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method != 'POST') {
        res.status(400).send('Method not supported')
        return
    }

    const user = req.body.user as string
    const password = req.body.password as string

    if (user == undefined || password == undefined) {
        res.status(400).send('Invalid credentials')
        return
    }

    // validate user
    const userObj = getUser(user)

    if (userObj == undefined) {
        res.status(400).send('Invalid credentials')
        return
    }

    const valid = await bcrypt.compare(password, userObj.hash)

    if (!valid) {
        res.status(400).send('Invalid credentials')
        return
    }

    const jwt = new JWT()
    res.status(200).json(jwt.getToken(user))
}
