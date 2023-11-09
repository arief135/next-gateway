import { Test, TestingModule } from '@nestjs/testing';
import { ProxiesController } from './proxies.controller';
import { ProxiesService } from './proxies.service';
import { PrismaService } from 'src/prisma.service';

describe('ProxiesController', () => {
  let controller: ProxiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxiesController],
      providers: [ProxiesService, PrismaService],
    }).compile();

    controller = module.get<ProxiesController>(ProxiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
