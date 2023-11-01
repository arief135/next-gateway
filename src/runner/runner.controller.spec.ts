import { Test, TestingModule } from '@nestjs/testing';
import { RunnerController } from './runner.controller';

describe('RunnerController', () => {
  let controller: RunnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunnerController],
    }).compile();

    controller = module.get<RunnerController>(RunnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
