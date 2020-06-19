import { Entity, PrimaryGeneratedColumn, Column, Generated, UpdateDateColumn, OneToMany, CreateDateColumn } from "typeorm";
import { BookingEntity } from './booking.entity';

export enum UserRole {
    ADMIN = 101,
    COACH = 102,
    PRACTITIONER = 103,
    GUEST = 200
}


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: number;

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


    @CreateDateColumn()
    CreatedAt?: number

    @UpdateDateColumn()
    UpdatedAt?: number
  

    @Column()
    email?: string;

    @Column()
    password?: string;

    @Column({ default: "true" })
    active?: string;

    @OneToMany(type => BookingEntity, booking => booking.user)
    booking?: BookingEntity;


}

