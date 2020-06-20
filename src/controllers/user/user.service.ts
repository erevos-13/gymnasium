import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from '../../entitys/user.entity';
import { Connection, Repository } from 'typeorm';
import { UserAuth } from '../../models/User.auth';
import { UpdateUserInput } from '../../models/UpdateRole.input';
import { identity } from 'rxjs';

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


    async updateUserToPractitioner(userToUpdate: UpdateUserInput, user: UserAuth): Promise<any> {
        try {
            const userFound = await this.usersRepository.findOne({ userId: userToUpdate.userId });
            if (!userFound) {
                const error_ = new Error();
                error_.message = 'User is not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const user_ = await this.usersRepository.findOne({ userId: user.userId });
            if ((user_.role === UserRole.ADMIN) || (user_.role === UserRole.SUPER_ADMIN) && user_.gymId === userToUpdate.gymId) {

                try {
                    const userUpdated_ = await this.connection.createQueryBuilder()
                        .update(UserEntity)
                        .set({
                            role: userToUpdate.role,
                        })
                        .where("userId = :userId", { userId: userToUpdate.userId })
                        .execute();
                    return userFound;
                } catch (error) {
                    const error_ = new Error();
                    error_.message = 'User role is not updated';
                    error_.stack = `${HttpStatus.NOT_IMPLEMENTED}`;
                    throw error_;
                }
            }
            const error_ = new Error();
            error_.message = 'This User can not update other users';
            error_.stack = `${HttpStatus.NOT_IMPLEMENTED}`;
            throw error_;
        } catch (error) {
            throw error;

        }
    }


}