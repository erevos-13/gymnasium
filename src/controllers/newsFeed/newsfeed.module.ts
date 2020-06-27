import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsFeedEntity } from '../../entitys/newsFeed.entity';
import { NewsFeedController } from './newsfeed.controller';
import { NewsFeedService } from './newsfeed.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        TypeOrmModule.forFeature([NewsFeedEntity]),
        ],
    controllers: [NewsFeedController],
    providers: [NewsFeedService],
    exports: [TypeOrmModule]
})
export class NewsFeedModule { }
