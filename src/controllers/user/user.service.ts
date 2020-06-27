import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from '../../entitys/user.entity';
import { Connection, Repository } from 'typeorm';
import { UserAuth } from '../../models/User.auth';
import { UpdateUserInput } from '../../models/UpdateRole.input';
import { UserUpdateInput } from '../../models/UserUpdate.input';
import * as bcrypt from 'bcryptjs';
import { MetadataEntity } from '../../entitys/metadata.entity';
import * as _ from "lodash";

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

        const metadata_ = await this.connection.createQueryBuilder(MetadataEntity, 'metadata')
        .where("userUserId = :userId", { userId: user_.userId })
        .select([
            "metadata.key",
            "metadata.value"
        ])
        .execute();
        
       


        return {
            userId: user_.userId,
            lastname: user_.lastname,
            username: user_.username,
            role: user_.role,
            active: user_.active,
            email: user_.email,
            gymId: user_.gymId,
            metadata: metadata_
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.usersRepository.findOne({ where: { email: email } });
            if (!user) {
                throw null;
            }
            return user;
        } catch (error) {
            return null
        }
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

    async updateUser(userInput: UserUpdateInput, user: UserAuth): Promise<any> {
        try {
            const userFound = await this.usersRepository.findOne({ userId: user.userId });
            if (!userFound) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            let userObjectToUpdate = {};
            if (userInput.lastname) {
                userObjectToUpdate = Object.assign({}, { lastname: userInput.lastname });
            }
            if (userInput.email) {
                userObjectToUpdate = Object.assign({}, { email: userInput.email });
            }
            if (userInput.password) {
                const passwordHash = await bcrypt.hash(userInput.password, 8);
                userObjectToUpdate = Object.assign({}, { password: passwordHash });
            }
            if (userInput.username) {
                userObjectToUpdate = Object.assign({}, { username: userInput.username });
            }

            try {
                await this.connection.createQueryBuilder()
                    .update(UserEntity)
                    .set(userObjectToUpdate)
                    .where("userId = :userId", { userId: user.userId })
                    .execute();
                return userInput
            } catch (error) {
                const error_ = new Error();
                error_.message = 'User not Updated';
                error_.stack = `${HttpStatus.NOT_IMPLEMENTED}`;
                throw error_;
            }
        } catch (error) {
            throw error;

        }
    }


    async getUsers(user: UserEntity): Promise<any> {
        try {
            const userFound = await this.usersRepository.findOne({ userId: user.userId });
            if (!userFound) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            let query_ = {};
            switch (userFound.role) {
                case UserRole.SUPER_ADMIN:
                    query_ = {};
                    break;
                case UserRole.ADMIN:
                    query_ = Object.assign({}, { where: { gymId: userFound.gymId } });
                    break;
                default:
                    const error_ = new Error();
                    error_.message = 'User have not the permission to see users';
                    error_.stack = `${HttpStatus.NON_AUTHORITATIVE_INFORMATION}`;
                    throw error_;
                    break;
            }
            const allUsers_ = await this.usersRepository.find(query_);
            if (allUsers_.length === 0) {
                const error_ = new Error();
                error_.message = 'Users not found';
                error_.stack = `${HttpStatus.NO_CONTENT}`;
                throw error_;
            }
            return allUsers_;
        } catch (error) {
            throw error
        }
    }

}