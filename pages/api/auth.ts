// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import { getUser } from '@/src/models/User';
import { encode, JWT } from 'next-auth/jwt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method != 'POST') {
        res.status(400).send('Method not supported')
        return
    }

    const { user = '', password = '' } = req.body

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

    const secret = process.env.NEXTAUTH_SECRET as string
    const token: JWT = { name: userObj.user }
    const encoded = await encode({ secret, token })

    const expire = new Date()
    expire.setSeconds(30 * 24 * 60 * 60)

    res.status(200).json({ token: encoded, expire })
}
