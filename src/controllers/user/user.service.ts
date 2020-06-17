import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entitys/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private connection: Connection,
    ){}

    findOne(email: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ where: { email: email } });
      }


      
}