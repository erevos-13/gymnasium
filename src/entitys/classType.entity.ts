import { Entity, PrimaryGeneratedColumn, Column, Generated, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { ClassEntity } from "./class.entity";




@Entity()
export class ClassTypeEntity{

   

    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(type => ClassEntity, class_ => class_.classType)
    type: ClassEntity;

    @Column()
    name: string;

    @Column()
    value: string;

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