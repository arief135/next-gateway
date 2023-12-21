import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export enum TraceStep {
    REQUEST_RECEIVED = 'REQUEST_RECEIVED',
    REQUEST_REWRITE = 'REQUEST_REWRITE',
    REQUEST_FORWARDED = 'REQUEST_FORWARDED',
    RESPONSE_RECEIVED = 'RESPONSE_RECEIVED',
}

@Injectable()
export class TraceService {

    constructor(private prisma: PrismaService) { }

    public addEntry(entry: Prisma.TraceCreateInput) {
        return this.prisma.trace.create({ data: entry })
    }

}
