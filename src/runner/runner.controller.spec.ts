import { Test, TestingModule } from '@nestjs/testing';
import { RunnerController } from './runner.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { ProxiesService } from 'src/proxies/proxies.service';
import { RunnerService } from './runner.service';

describe('RunnerController', () => {
  let controller: RunnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunnerController],
      imports: [HttpModule],
      providers: [RunnerService, ProxiesService, PrismaService]
    }).compile();

    controller = module.get<RunnerController>(RunnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
