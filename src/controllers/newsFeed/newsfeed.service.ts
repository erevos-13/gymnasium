import { Injectable, HttpStatus } from '@nestjs/common';
import { NewsFeedEntity } from '../../entitys/newsFeed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { NewsFeedInput } from '../../models/NewsFeed.input';
import { UserAuth } from '../../models/User.auth';
import { UserEntity, UserRole } from '../../entitys/user.entity';
import { runInNewContext } from 'vm';

@Injectable()
export class NewsFeedService {

    constructor(
        @InjectRepository(NewsFeedEntity) private newsFeedSrv: Repository<NewsFeedEntity>,
        private connection: Connection,
    ) {

    }

    async getNewsFeed(user_: UserAuth, query: { rangeFrom: number, rangeTo: number }) {
        try {
            const user = await this.connection.getRepository(UserEntity).findOne({ userId: user_.userId })
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }

            const from_ = +query.rangeFrom || 0;
            const to_ = +query.rangeTo || 10;
            try {
                let newsFeedRepository;

                if (user.role === UserRole.SUPER_ADMIN) {
                  newsFeedRepository =  await this.connection.getRepository(NewsFeedEntity)
                    .createQueryBuilder("news_feed_entity")
                    .skip(from_)
                    .take(to_)
                    .getMany();
                }else {
                    newsFeedRepository = await this.connection.getRepository(NewsFeedEntity)
                    .createQueryBuilder("news_feed_entity")
                    .where("news_feed_entity.userId = :name", { name: `${user.userId}` })
                    .skip(from_)
                    .take(to_)
                    .getMany();
                }
                

                if (!newsFeedRepository) {
                    const error_ = new Error();
                    error_.message = 'News feed not found';
                    error_.stack = `${HttpStatus.NOT_FOUND}`;
                    throw error_;
                }

                return newsFeedRepository;
            } catch (error) {
                const error_ = new Error();
                error_.message = 'News feed query fail';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }

        } catch (error) {
            throw error;
        }
    }

    async createNewsFeed(body: NewsFeedInput, user_: UserAuth, imageUrl: string) {
        try {

            //TODO get the user id and the gymId 
            const user = await this.connection.getRepository(UserEntity).findOne({ userId: user_.userId })
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            //TODO create the neews feed
            try {
                const newsFeed = new NewsFeedEntity();
                newsFeed.gymId = user.gymId;
                newsFeed.image = imageUrl;
                newsFeed.message = body.message;
                newsFeed.title = body.title;
                newsFeed.userId = user.userId;
                const newsFeed_ = await this.newsFeedSrv.save(newsFeed);
                return newsFeed_
            } catch (error) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.BAD_REQUEST}`;
                throw error_;
            }
        } catch (error) {
            throw error;
        }

    }


    async updateNewsFeed(body: NewsFeedInput, user_: UserAuth, imageUrl: string) {
        try {
            if (!body.id) {
                const error_ = new Error();
                error_.message = 'News feed id is not provide';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const user = await this.connection.getRepository(UserEntity).findOne({ userId: user_.userId })
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            try {
                const updateNewsFeed = async () => {
                    let newFeedObj = {};
                    if (body.message) {
                        newFeedObj = Object.assign(newFeedObj, { message: body.message })
                    }
                    if (body.title) {
                        newFeedObj = Object.assign(newFeedObj, { title: body.title })

                    }
                    if (imageUrl) {
                        newFeedObj = Object.assign(newFeedObj, { image: imageUrl })
                    }
                    await this.newsFeedSrv.update(body.id, newFeedObj);
                    return newsFeed_;

                }
                const newsFeed_ = await this.newsFeedSrv.findOne({ where: { id: body.id } });
                if (!newsFeed_) {
                    const error = new Error();
                    error.message = 'Post not found';
                    error.stack = `${HttpStatus.FOUND}`;
                    throw error;
                }
                if (user.gymId === newsFeed_.gymId && user.role === UserRole.ADMIN) {
                    updateNewsFeed();
                    return;
                }
                if (user.role === UserRole.SUPER_ADMIN) {
                    updateNewsFeed();
                    return;
                }
                const error = new Error();
                error.message = 'User can not update News Feed';
                error.stack = `${HttpStatus.UNAUTHORIZED}`;
                throw error;

            } catch (error) {
                const error_ = new Error();
                error_.message = 'News feed not found';
                error_.stack = `${HttpStatus.NO_CONTENT}`;
                throw error_;
            }
        } catch (error) {
            throw error;
        }
    }


    async deleteNewsFeedById(newsFeedId: string, user_: UserAuth) {
        try {
            if (!newsFeedId) {
                const error_ = new Error();
                error_.message = 'News feed id is not provide';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const user = await this.connection.getRepository(UserEntity).findOne({ userId: user_.userId })
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            try {
                const newsFeed_ = await this.newsFeedSrv.findOne({ where: { id: newsFeedId } });
                if (!newsFeed_) {
                    const error = new Error();
                    error.message = 'News feed not found';
                    error.stack = `${HttpStatus.FOUND}`;
                    throw error;
                }

                const deleteNewsFeed = async () => {
                    await this.connection.getRepository(NewsFeedEntity)
                        .createQueryBuilder()
                        .delete()
                        .where("id = :id", { id: newsFeed_.id })
                        .execute();
                    return { message: "News Feed deleted", newsFeedId: newsFeedId };
                }
                if (user.gymId === newsFeed_.gymId && user.role === UserRole.ADMIN) {
                    deleteNewsFeed();
                    return;
                }
                if (user.role === UserRole.SUPER_ADMIN) {
                    deleteNewsFeed();
                    return;
                }
                const error = new Error();
                error.message = 'user can not delete news feed';
                error.stack = `${HttpStatus.UNAUTHORIZED}`;
                throw error;

            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }





}
