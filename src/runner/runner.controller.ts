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
import { TraceService } from 'src/trace/trace.service'

@Controller('run')
export class RunnerController {

    constructor(private runnerService: RunnerService, private traceService: TraceService) { }

    @Post('test_connection')
    @Public()
    async testConnection(@Req() req: Request, @Res() res: Response) {
        const result = await this.runnerService.testConnection(
            req.body.targetURL,
            req.body.username,
            req.body.password,
            req.body.ignoreCert)

        res.setHeader('Content-Type', result.headers[ 'content-type' ])

        res.statusMessage = 'Connected'
        res.statusCode = 200
        res.send(result.data)
    }

    @All(':dest*')
    async run(@Req() req:Request, @Res() res: Response, @Param() params) {
        await this.runnerService.run(params.dest, req, res)
    }

}
