import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataEntity } from '../../entitys/metadata.entity';
import { MetadataController } from './metadata.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetadataEntity]),
  ],
  controllers: [MetadataController],
  providers: [MetadataService],
  exports: [TypeOrmModule]
})
export class MetadataModule { }
