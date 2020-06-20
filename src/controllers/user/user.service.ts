import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entitys/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private connection: Connection,
    ) { }

    async findOne(userId: string): Promise<UserEntity> {
        const user_ = await this.usersRepository.findOne({ where: { userId: userId } });
        if (!user_) {
            const error_ = new Error();
            error_.message = 'User not found';
            error_.stack = `${HttpStatus.NOT_FOUND}`;
            throw error_;
        }

        return {
            userId: user_.userId,
            lastname: user_.lastname,
            username: user_.username,
            role: user_.role,
            active: user_.active,
            email: user_.email,
            gymId: user_.gymId
        }
    }

    findByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ where: { email: email } })
    }



}