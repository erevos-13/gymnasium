import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '../../entitys/booking.entity';
import { BookingController } from './booking.controller';
import { UserEntity } from '../../entitys/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [TypeOrmModule]
})
export class BookingModule { }
