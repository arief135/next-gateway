import { Test, TestingModule } from '@nestjs/testing';
import { ProxiesService } from './proxies.service';
import { PrismaService } from 'src/prisma.service';

describe('ProxiesService', () => {
  let service: ProxiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProxiesService, PrismaService],
    }).compile();

    service = module.get<ProxiesService>(ProxiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
