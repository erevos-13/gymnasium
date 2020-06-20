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
    id: string;


    @Column()
    @Generated("uuid")
    bookingId: string;

    @Column()
    classId: string;

    @CreateDateColumn()
    CreatedAt: string;


    @UpdateDateColumn()
    UpdatedAt: string

    @ManyToOne(type => UserEntity, user => user.booking)
    user: UserEntity;


}