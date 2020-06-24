
import { PrimaryGeneratedColumn, Generated, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, Entity } from "typeorm";

@Entity()
export class NewsFeedEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column({
        default: true
    })
    active: string;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column()
    image: string;

    @Column()
    gymId: string;

    @Column()
    userId:string;

    @CreateDateColumn()
    CreatedAt: string;


    @UpdateDateColumn()
    UpdatedAt: string


}
