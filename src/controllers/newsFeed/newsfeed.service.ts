import { Injectable } from '@nestjs/common';
import { NewsFeedEntity } from '../../entitys/newsFeed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { NewsFeedInput } from '../../models/NewsFeed.input';
import { UserAuth } from '../../models/User.auth';

@Injectable()
export class NewsFeedService {

    constructor(
        @InjectRepository(NewsFeedEntity) private classTypeSrv: Repository<NewsFeedEntity>,
        private connection: Connection,
    ) {

    }

    createNewsFeed(body: NewsFeedInput, user_: UserAuth) {
        try {

            //TODO get the user id and the gymId 

            //TODO create the neews feed

        

            

        } catch (error) {
            throw error;
        }

    }





}
