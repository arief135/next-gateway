import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';
import { ProxiesService } from 'src/proxies/proxies.service';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { TraceService } from 'src/trace/trace.service';

@Module({
  imports:[HttpModule],
  controllers: [RunnerController],
  providers: [RunnerService, ProxiesService, PrismaService, TraceService]
})
export class RunnerModule { }
