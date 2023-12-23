import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxiesModule } from './proxies/proxies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RunnerModule } from './runner/runner.module';
import { TraceModule } from './trace/trace.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'c:\\Devs\\Temporary\\Javascript\\temp\\my-project\\dist',
      exclude: [ '/api/(.*)' ],
    }),
    ProxiesModule,
    AuthModule,
    UsersModule,
    RunnerModule,
    TraceModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule { }
