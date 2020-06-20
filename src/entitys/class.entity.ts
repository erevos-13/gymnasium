import { PrimaryGeneratedColumn, Generated, Column, ManyToOne, Entity, CreateDateColumn } from "typeorm";
import { ClassTypeEntity } from './classType.entity';

@Entity()
export class ClassEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

  

    @Column()
    hour: string;

    @Column({default: 0})
    attendants: number;

    @Column()
    userId: string;

    @Column()
    classType: number;

    @CreateDateColumn()
    CreatedAt: number

    @CreateDateColumn()
    UpdatedAt: number

    @Column()
    maxParticipant: number;





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