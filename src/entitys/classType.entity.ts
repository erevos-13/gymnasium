import { Entity, PrimaryGeneratedColumn, Column, Generated, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { ClassEntity } from "./class.entity";




@Entity()
export class ClassTypeEntity{

   

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    type: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    gymId: string;

    @UpdateDateColumn()
    CreatedAt: number;

    @UpdateDateColumn()
    UpdatedAt: number;


}

/**
 * id : string

type: name

name: string

value: number
 */