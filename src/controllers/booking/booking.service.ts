import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { BookingEntity } from '../../entitys/booking.entity';
import { Repository, Connection } from 'typeorm';
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
                error_.message = 'Class not found can not create booking';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }

           
            try {
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
                    user:{
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


    async findByUserId(user: UserAuth): Promise<BookingDTO[]> {
        try {
            const bookingRepository = await this.connection.getRepository(BookingEntity)
            .createQueryBuilder("booking_entity")
            .leftJoinAndSelect("booking_entity.user", "user_entity")
            .where("booking_entity.userUserId = :name", { name: `${user.userId}` })
            .getMany();
            this.logger.log(bookingRepository);
            const response = [];
            bookingRepository.forEach((item) => {
                const dto: BookingDTO = {
                    id: item.id,
                    bookingId: item.bookingId,
                    createdAt: item.CreatedAt,
                    classId: item.classId,
                    updatedAt: item.UpdatedAt,
                    user: {
                        userId: item.user.userId,
                        email: item.user.email,
                        username: item.user.username,
                        lastname: item.user.lastname
                    }

                } 
                response.push(dto);
            })
            
            return response;
        } catch (error) {
            throw error;
        }


    }

}
