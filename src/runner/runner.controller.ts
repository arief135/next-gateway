import {
    All,
    Controller,
    Param,
    Post,
    Req,
    Res
} from '@nestjs/common'
import { RunnerService } from './runner.service'
import { Public } from 'src/auth/auth.guard'
import { Request, Response } from 'express'
import axios from 'axios'
import { Agent } from 'node:https'
import fetch from 'node-fetch'

@Controller('run')
@Public()
export class RunnerController {

    constructor(private runnerService: RunnerService) { }

    @Post('test_connection')
    async testConnection(@Req() req: Request, @Res() res: Response) {
        const result = await this.runnerService.testConnection(
            req.body.targetURL,
            req.body.username,
            req.body.password,
            req.body.ignoreCert)

        res.setHeader('Content-Type', result.headers['content-type'])

        res.statusMessage = 'Connected'
        res.statusCode = 200
        res.send(result.data)
    }

    @All(':dest*')
    async run(@Req() req: Request, @Res() res: Response, @Param() params) {
        const result = await this.runnerService.run(params.dest, req, res)

        const headers = result.headers.raw()

        delete headers['content-encoding']

        for (const key in headers) {
            const value = headers[key];
            res.setHeader(key, value)
        }

        const text = await result.text()

        res.statusCode = result.status
        res.statusMessage = result.statusText
        
        res.send(text)
    }

}
