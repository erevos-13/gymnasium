import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from '../../entitys/class.entity';
import { Connection, Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { ClassInput } from '../../models/Class.input';
import { ClassTypeEntity } from '../../entitys/classType.entity';
import { use } from 'passport';
import { UserAuth } from '../../models/User.auth';
import { UserEntity, UserRole } from '../../entitys/user.entity';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(ClassEntity) private classSrv: Repository<ClassEntity>,
        @InjectRepository(ClassTypeEntity) private classTypeSrv: Repository<ClassTypeEntity>,
        private connection: Connection,
    ) { }

    async createClasses(body: ClassInput, user: UserAuth): Promise<ClassEntity> {
        try {
            const user_ = await this.connection.getRepository(UserEntity).findOne({ userId: user.userId });
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const foundClassType_ = await this.classTypeSrv.findOne({ where: { type: body.classType } });
            if (!foundClassType_) {
                const error_ = new Error();
                error_.message = 'Class type you pass is not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;


            }
            const class_ = new ClassEntity();
            class_.hour = body.hour;
            class_.maxParticipant = body.maxParticipant;
            class_.classType = body.classType;
            class_.userId = user.userId;
            class_.gymId = (body.gymId) ? body.gymId : user_.gymId;
            class_.dateStart = body.dateStart;
            class_.dateEnd = body.dateEnd;


            const save_ = await this.classSrv.save(class_);
            return save_;

        } catch (error) {
            throw error;
        }
    }

    async find(dateStart: number, dateEnd: number, type: number, user: UserEntity, rangeFrom: number, rangeTo: number, gymId: string) {
        try {
            const user_ = await this.connection.getRepository(UserEntity).findOne({ userId: user.userId });
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            if (user_.role === UserRole.SUPER_ADMIN) {
                const class_ = await await this.classSrv.find();
                if (class_.length === 0) {
                    const error_ = new Error();
                    error_.message = 'Class types  not found';
                    error_.stack = `${HttpStatus.NO_CONTENT}`;
                    throw error_;
                }
                return class_;
            }
            // const foundClass_ = await this.classSrv.find({ where: { gymId: user_.gymId, classType: type, } });
            let foundClass_;
            // if (!type) {
            //     const error_ = new Error();
            //     error_.message = 'Class types  not found';
            //     error_.stack = `${HttpStatus.NO_CONTENT}`;
            //     throw error_;
            // }
            let pagination_ = {}
            let query_ = Object.assign({}, {
                gymId: user_.gymId
            })
            if (type) {
                query_ = Object.assign(query_, {
                    classType: type
                });
            }
            if (dateStart) {
                query_ = Object.assign(query_, {
                    dateStart: MoreThanOrEqual(+dateStart),

                });
            }
            if (dateEnd) {
                query_ = Object.assign(query_, {
                    dateEnd: LessThanOrEqual(+dateEnd)
                });
            }
            if (rangeFrom) {
                pagination_ = Object.assign(pagination_, {
                    skip: +rangeFrom
                })
            }
            if (rangeTo) {
                pagination_ = Object.assign(pagination_, {
                    take: +rangeTo
                })
            }
            try {

                foundClass_ = await this.classSrv.findAndCount({ where: query_, skip: +rangeFrom, take: +rangeTo });
            } catch (error) {
                console.log(error);
                const error_ = new Error();
                error_.message = 'Class types  not found';
                error_.stack = `${HttpStatus.NO_CONTENT}`;
                throw error_;
            }
            return { classes: foundClass_[0], count: foundClass_[1] };

        } catch (error) {
            throw error;
        }
    }

}
