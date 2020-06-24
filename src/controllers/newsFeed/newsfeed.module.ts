import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsFeedEntity } from '../../entitys/newsFeed.entity';
import { NewsFeedController } from './newsfeed.controller';
import { NewsFeedService } from './newsfeed.service';

@Module({
    imports: [TypeOrmModule.forFeature([NewsFeedEntity])],
    controllers: [NewsFeedController],
    providers: [NewsFeedService],
    exports: [TypeOrmModule]
})
export class NewsFeedModule { }
