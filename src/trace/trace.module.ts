import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TraceService } from './trace.service';

@Module({
    providers: [ TraceService, PrismaService ]
})
export class TraceModule { }
