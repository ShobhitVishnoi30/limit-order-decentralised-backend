import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserOrderFilter } from 'src/dto/user-fliter.dto';
import { apiResponse } from 'src/shared/api-response-instance';
import { LimitOrder } from 'src/shared/limit-order.interface';
import { LimitOrderService } from './limit-order.service';

@ApiTags('LimitOrders')
@Controller('limit-order')
export class LimitOrderController {
  constructor(private limitOrderService: LimitOrderService) {}

  @Get()
  async getAllLimitOrders(): Promise<apiResponse> {
    return this.limitOrderService.getAllLimitOrders();
  }

  @Get(':user')
  async getUserLimitOrders(
    @Param('user') userAddress: string,
    @Query() userOrderFilter: UserOrderFilter,
  ): Promise<apiResponse> {
    return this.limitOrderService.getLimitOrder(userAddress, userOrderFilter);
  }
}
