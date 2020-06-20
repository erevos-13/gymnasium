import { PrimaryGeneratedColumn, Generated, Column, ManyToOne, Entity, CreateDateColumn } from "typeorm";

@Entity()
export class GymEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

  

    @Column()
    name: string;

   
    @Column()
    value: string;

    @Column()
    type: string;


    @Column()
    active: boolean;


}

