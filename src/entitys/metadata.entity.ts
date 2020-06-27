import { Entity, PrimaryGeneratedColumn, Column, Generated, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";




@Entity()
export class MetadataEntity {



    @PrimaryGeneratedColumn("uuid")
    id: FunctionStringCallback;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    key: string;

    @ManyToOne(type => UserEntity, user => user.metadata)
    user: UserEntity;

    @UpdateDateColumn()
    CreatedAt: number;

    @UpdateDateColumn()
    UpdatedAt: number;


}

