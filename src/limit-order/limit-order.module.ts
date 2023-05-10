import { Module } from '@nestjs/common';
import { LimitOrderController } from './limit-order.controller';
import { LimitOrderService } from './limit-order.service';

@Module({
  controllers: [LimitOrderController],
  providers: [LimitOrderService],
  exports : [LimitOrderService]
})
export class LimitOrderModule {}
