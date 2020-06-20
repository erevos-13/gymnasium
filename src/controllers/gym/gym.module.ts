import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymEntity } from '../../entitys/gym.entity';
import { GymController } from './gym.controller';


@Module({
  providers: [GymService],
  imports: [TypeOrmModule.forFeature([GymEntity])],
  controllers: [GymController],
  exports: [TypeOrmModule]
})
export class GymModule { }
