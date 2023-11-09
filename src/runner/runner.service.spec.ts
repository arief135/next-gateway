import { Test, TestingModule } from '@nestjs/testing';
import { RunnerService } from './runner.service';
import { ProxiesService } from 'src/proxies/proxies.service';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';

describe('RunnerService', () => {
  let service: RunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RunnerService, ProxiesService, PrismaService],
    }).compile();

    service = module.get<RunnerService>(RunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
