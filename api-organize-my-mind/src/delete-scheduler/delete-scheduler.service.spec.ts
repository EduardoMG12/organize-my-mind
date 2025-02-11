import { Test, TestingModule } from '@nestjs/testing';
import { DeleteSchedulerService } from './delete-scheduler.service';

describe('DeleteSchedulerService', () => {
  let service: DeleteSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteSchedulerService],
    }).compile();

    service = module.get<DeleteSchedulerService>(DeleteSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
