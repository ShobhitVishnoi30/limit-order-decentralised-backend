import { Module } from '@nestjs/common';
import { LimitOrderModule } from 'src/limit-order/limit-order.module';
import { LimitOrderService } from 'src/limit-order/limit-order.service';
import { PairTrackingService } from './pair-tracking.service';

@Module({
  imports:[LimitOrderModule],
  providers: [PairTrackingService],
})
export class PairTrackingModule {}
