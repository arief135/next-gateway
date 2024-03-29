import { Module } from '@nestjs/common';
import { ProxiesService } from './proxies.service';
import { ProxiesController } from './proxies.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProxiesController],
  providers: [ProxiesService, PrismaService]
})
export class ProxiesModule { }
