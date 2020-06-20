import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from '../../entitys/class.entity';
import { ClassesController } from './classes.controller';
import { ClassTypeEntity } from '../../entitys/classType.entity';

@Module({
  providers: [ClassesService],
  imports: [TypeOrmModule.forFeature([ClassEntity]),TypeOrmModule.forFeature([ClassTypeEntity])],
  controllers: [ClassesController],
  exports: [TypeOrmModule]
})
export class ClassesModule {}
