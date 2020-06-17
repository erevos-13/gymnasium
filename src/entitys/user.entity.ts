import { Entity, PrimaryGeneratedColumn, Column, Generated, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = 101,
    COACH = 102,
    PRACTITIONER = 103,
    GUEST = 200
}


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    userId: string;

    @Column()
    username: string;

    @Column()
    lastname: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GUEST
    })
    role: UserRole;


    @UpdateDateColumn()
    CreatedAt: number

    @UpdateDateColumn()
    UpdatedAt: number
  

    @Column()
    email: string;

    @Column()
    password?: string;

    @Column({ default: "true" })
    active?: string;


}

