import { Injectable, HttpStatus } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { GymInput } from '../../models/Gym.input';
import { GymEntity } from '../../entitys/gym.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from '../../models/User.auth';
import { UserEntity, UserRole } from '../../entitys/user.entity';

@Injectable()
export class GymService {
    constructor(
        @InjectRepository(GymEntity) private gymRepository: Repository<GymEntity>,
        private connection: Connection,
    ) {

    }

    async create(body: GymInput, user_: UserAuth) {
        try {
            const user = await this.connection.getRepository(UserEntity).findOne({ email: user_.email })
            if (!user) {
                const error_ = new Error();
                error_.message = 'User is not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            if (user.role !== UserRole.SUPER_ADMIN) {
                const error_ = new Error();
                error_.message = 'this user can not create gyms';
                error_.stack = `${HttpStatus.FORBIDDEN}`;
                throw error_;
            }
            const gym_ = await this.connection.getRepository(GymEntity)
                .find({ where: { name: body.name } });
            if (gym_.length !== 0) {
                const error_ = new Error();
                error_.message = 'Gym found not register the same';
                error_.stack = `${HttpStatus.FOUND}`;
                throw error_;
            }
            const gymes_ = new GymEntity()
            gymes_.name = body.name;
            gymes_.type = body.type;
            gymes_.value = body.value;
            const save_ = await this.connection.getRepository(GymEntity).save(gymes_);
            return save_;

        } catch (error) {
            throw error;
        }

    }


    async findGyms(user_: UserAuth) {
        try {
            const user = await this.connection.getRepository(UserEntity).findOne({ email: user_.email });
            if (!user) {
                const error_ = new Error();
                error_.message = 'User is not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            if (user.role !== UserRole.SUPER_ADMIN) {
                const error_ = new Error();
                error_.message = 'this user can not create gyms';
                error_.stack = `${HttpStatus.FORBIDDEN}`;
                throw error_;
            }
            const gym_ = await this.connection.getRepository(GymEntity)
                .find();
            if (gym_.length === 0) {
                const error_ = new Error();
                error_.message = 'Gym is empty';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            return gym_;
        } catch (error) {
            throw error;
        }

    }
}
