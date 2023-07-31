import { Test, TestingModule } from '@nestjs/testing';
import { ProxiesController } from './proxies.controller';
import { ProxiesService } from './proxies.service';

describe('ProxiesController', () => {
  let controller: ProxiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxiesController],
      providers: [ProxiesService],
    }).compile();

    controller = module.get<ProxiesController>(ProxiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
