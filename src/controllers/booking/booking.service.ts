import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { BookingEntity } from '../../entitys/booking.entity';
import { Repository, Connection, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingInput } from '../../models/Booking.input';
import { UserAuth } from '../../models/User.auth';
import { UserEntity } from '../../entitys/user.entity';
import { ClassEntity } from '../../entitys/class.entity';
import { BookingDTO } from '../../models/BookingDTO';

@Injectable()
export class BookingService {
    private logger = new Logger();
    constructor(
        @InjectRepository(BookingEntity) private bookingRepository: Repository<BookingEntity>,
        @InjectRepository(ClassEntity) private classEntity: Repository<ClassEntity>,
        private connection: Connection,
    ) { }


    async createBookOfUser(body: BookingInput, user_: UserAuth): Promise<BookingDTO> {
        try {

            const userRepository = await this.connection.getRepository(UserEntity);
            const userCreateBooking_ = await userRepository.findOne({ where: { userId: user_.userId } });
            if (!userCreateBooking_) {
                const error_ = new Error();
                error_.message = 'User not found can not create booking';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const classRepository = await this.connection.getRepository(ClassEntity);
            const classFound = await classRepository.findOne({ where: { id: body.classId } });
            if (!classFound) {
                const error_ = new Error();
                error_.message = 'Class not found you can not create booking ';
                error_.stack = `${HttpStatus.FOUND}`;
                throw error_;
            }
            const bookingRepository = await this.connection.getRepository(BookingEntity)
                .createQueryBuilder("booking_entity")
                .leftJoinAndSelect("booking_entity.user", "user_entity")
                .where("booking_entity.userUserId = :userId", { userId: `${user_.userId}` })
                .andWhere("booking_entity.classId = :classId", { classId: `${body.classId}` })
                .getMany();
            if (bookingRepository.length !== 0) {
                const error_ = new Error();
                error_.message = 'Class found you can not create booking in the same class';
                error_.stack = `${HttpStatus.FOUND}`;
                throw error_;
            }


            try {
                console.log('[booking class] update class old new', classFound)
                console.log('[booking class] update att', classFound.attendants, classFound.attendants++)
                const updateClass = await this.connection.createQueryBuilder()
                    .update(ClassEntity)
                    .set({ attendants: classFound.attendants })
                    .where("id = :id", { id: classFound.id })
                    .execute();
                    console.log('update class in booking', updateClass)
                const book_ = new BookingEntity();
                book_.classId = classFound.id;
                book_.user = userCreateBooking_;
                const save_ = await this.bookingRepository.save(book_);
                const resp: BookingDTO = {
                    bookingId: save_.bookingId,
                    classId: save_.classId,
                    id: save_.id,
                    createdAt: save_.CreatedAt,
                    updatedAt: save_.UpdatedAt,
                    user: {
                        email: save_.user.email,
                        userId: save_.user.userId,
                        username: save_.user.username,
                        lastname: save_.user.lastname,
                        role: save_.user.role,

                    }
                }
                return resp
            } catch (error) {
                const error_ = new Error();
                error_.message = 'Booking can not create';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;

            }

        } catch (error) {
            throw error;
        }

    }


    async findByUserId(user: UserAuth, query: { rangeFrom: number, rangeTo: number }): Promise<BookingDTO[]> {
        try {
            const from_ = +query.rangeFrom || 0;
            const to_ = +query.rangeTo || 10;
            const bookingRepository = await this.connection.getRepository(BookingEntity)
                .createQueryBuilder("booking_entity")
                .leftJoinAndSelect("booking_entity.user", "user_entity")
                .where("booking_entity.userUserId = :name", { name: `${user.userId}` })
                .skip(from_)
                .take(to_)
                .getMany();
            this.logger.log(bookingRepository);
            const classesId_: string[] = bookingRepository.map((item) => {
                return item.classId;
            })
            let classes_: ClassEntity[]
            try {
                classes_ = await this.connection.getRepository(ClassEntity)
                    .find({
                        id: In(classesId_)
                    });
            } catch (error) {
                classes_ = [];
            }
            const response = [];
            bookingRepository.forEach((item) => {
                const dto: BookingDTO = {
                    id: item.id,
                    bookingId: item.bookingId,
                    createdAt: item.CreatedAt,
                    class: classes_,
                    updatedAt: item.UpdatedAt
                }
                response.push(dto);
            })

            return response;
        } catch (error) {
            throw error;
        }


    }

}
