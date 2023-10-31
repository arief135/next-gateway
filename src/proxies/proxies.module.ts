import { Module } from '@nestjs/common';
import { ProxiesService } from './proxies.service';
import { ProxiesController } from './proxies.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ProxiesController],
  providers: [ProxiesService, PrismaService]
})
export class ProxiesModule { }
