import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxiesModule } from './proxies/proxies.module';

@Module({
  imports: [ProxiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
