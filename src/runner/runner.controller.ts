import {
    All,
    Controller,
    Param,
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

    @All(':dest*')
    run(@Req() req: Request, @Res() res: Response, @Param() params) {
        return this.runnerService.run(params.dest, req, res)
    }

}
