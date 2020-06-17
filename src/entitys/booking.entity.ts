/**
 * Booking

id : string

userId: string

classId: string 

CreatedAt: number

UpdatedAt: number
 */

import { PrimaryGeneratedColumn, Generated, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, Entity } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class BookingEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;


    @Column()
    @Generated("uuid")
    bookingId: string;

    @Column()
    classId: string;

    @CreateDateColumn()
    CreatedAt: number

    @UpdateDateColumn()
    UpdatedAt: number

    @ManyToOne(type => UserEntity, user => user.booking)
    user: UserEntity;


}