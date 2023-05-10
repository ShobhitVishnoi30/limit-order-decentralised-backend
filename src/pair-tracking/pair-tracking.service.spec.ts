import { Test, TestingModule } from '@nestjs/testing';
import { PairTrackingService } from './pair-tracking.service';

describe('PairTrackingService', () => {
  let service: PairTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PairTrackingService],
    }).compile();

    service = module.get<PairTrackingService>(PairTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
