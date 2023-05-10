import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum OrderStatus {
  Active = '0',
  Executed = '1',
  Cancelled = '2',
}

export class UserOrderFilter {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
