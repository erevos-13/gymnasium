import { Injectable, HttpStatus } from '@nestjs/common';
import { ClassTypeEntity } from '../../entitys/classType.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { ClassTypeInput } from '../../models/ClassType.input';
import { UserEntity, UserRole } from '../../entitys/user.entity';


export enum ClassTypes {
    CROSSFIT = 102,
    BBJ = 101,

}


@Injectable()
export class ClassTypeService {
    constructor(
        @InjectRepository(ClassTypeEntity) private classTypeSrv: Repository<ClassTypeEntity>,
        private connection: Connection,
    ){}

    async createClassType(body: ClassTypeInput, user_: UserEntity): Promise<ClassTypeEntity> {
        try {
            const user = await this.connection.getRepository(UserEntity).findOne({userId: user_.userId})
            if(!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const classType_ = new ClassTypeEntity()
            classType_.name = body.name;
            classType_.type = body.type;
            classType_.value = body.value;
            classType_.gymId = user.gymId;
            const save_ = await this.classTypeSrv.save(classType_);
            return save_;
            
        } catch (error) {
            throw error;
        }
    }


    async findAll(user: UserEntity) {
        try {
            const user_ = await this.connection.getRepository(UserEntity).findOne({userId: user.userId});
            if(!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            if(user_.role === UserRole.SUPER_ADMIN) {
                const classTypes = await this.classTypeSrv.find();
                if(classTypes.length === 0) {
                    const error_ = new Error();
                    error_.message = 'Class types  not found';
                    error_.stack = `${HttpStatus.NO_CONTENT}`;
                    throw error_;
                }
                return classTypes;
            }
            const classTypes = await this.classTypeSrv.find({where: {gymId: user_.gymId}});
            if(classTypes.length === 0) {
                const error_ = new Error();
                error_.message = 'Class types  not found';
                error_.stack = `${HttpStatus.NO_CONTENT}`;
                throw error_;
            }
            return classTypes;
            
        } catch (error) {
            throw error;
        }
    }
}
