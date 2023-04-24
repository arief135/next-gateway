import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';
import proxyHandler from '../../../../pages/api/proxy/[...proxy]'

describe('/api/proxy/', () => {

    const mockRequestResponse = (method: RequestMethod = 'GET') => {
        const { req, res, }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method })

        req.headers = {
            'Content-Type': 'application/json',
        };

        req.query = { proxy: ['sap-adhi'] };

        return { req, res };
    }

    it('Return system not found 400', async () => {
        const { req, res, } = mockRequestResponse()
        proxyHandler(req, res)
        
        expect(res.statusCode).toBe(400)
    })

})