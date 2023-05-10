import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LimitOrderModule } from './limit-order/limit-order.module';
import ormConfig from './config/ormConfig';
import { ScheduleModule } from '@nestjs/schedule';
import { PairTrackingModule } from './pair-tracking/pair-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    ScheduleModule.forRoot(),

    LimitOrderModule,

    PairTrackingModule,
  ],
})
export class AppModule {}
