import { Injectable, HttpStatus } from '@nestjs/common';
import { ClassTypeEntity } from '../../entitys/classType.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { ClassTypeInput } from '../../models/ClassType.input';

@Injectable()
export class ClassTypeService {
    constructor(
        @InjectRepository(ClassTypeEntity) private classTypeSrv: Repository<ClassTypeEntity>,
        private connection: Connection,
    ){}

    async createClassType(body: ClassTypeInput): Promise<ClassTypeEntity> {
        try {
            const classType_ = new ClassTypeEntity()
            classType_.name = body.name;
            classType_.type = body.type;
            classType_.value = body.value;
            const save_ = await this.classTypeSrv.save(classType_);
            return save_;
            
        } catch (error) {
            const error_ = new Error();
            error_.message = 'User not found';
            error_.stack = `${HttpStatus.NOT_FOUND}`;
            throw error_;
        }
    }


    async findAll() {
        try {
            const classType = await this.classTypeSrv.find();
            return classType;
            
        } catch (error) {
            const error_ = new Error();
            error_.message = 'User not found';
            error_.stack = `${HttpStatus.NOT_FOUND}`;
            throw error_;
        }
    }
}
