import { PrimaryGeneratedColumn, Generated, Column, ManyToOne, Entity } from "typeorm";
import { ClassTypeEntity } from './classType.entity';

@Entity()
export class ClassEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    classId: string;

    @Column()
    hour: string;

    @Column()
    attendants: number;

    @ManyToOne(type => ClassTypeEntity, classType => classType.type)
    classType: ClassTypeEntity;

    @Column()
    CreatedAt: number;

    @Column()
    UpdatedAt: number





}

/**
 * Class

id : string

classId: string

hour: string

attendants: number

classType: number

CreatedAt: number

UpdatedAt: number
 */