import { Module } from '@nestjs/common';
import { ClassTypeController } from './class-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassTypeEntity } from '../../entitys/classType.entity';
import { ClassTypeService } from './class-type.service';


@Module({
  controllers: [ClassTypeController],
  providers:[ClassTypeService],
  imports: [TypeOrmModule.forFeature([ClassTypeEntity])],
exports: [TypeOrmModule]
})
export class ClassTypeModule {}
