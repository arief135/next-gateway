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

        console.log(result.headers)
        res.setHeader('Content-Type', result.headers['content-type'])

        res.statusMessage = 'Connected'
        res.statusCode = 200
        res.send(result.data)
    }

    @All(':dest*')
    run(@Req() req: Request, @Res() res: Response, @Param() params) {
        return this.runnerService.run(params.dest, req, res)
    }

}
