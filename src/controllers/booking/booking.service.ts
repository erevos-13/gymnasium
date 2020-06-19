import { Injectable, HttpStatus } from '@nestjs/common';
import { BookingEntity } from '../../entitys/booking.entity';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingInput } from '../../models/Booking.input';

@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(BookingEntity) private bookingRepository: Repository<BookingEntity>,
        private connection: Connection,
    ){}


   async createBookOfUser(body: BookingInput): Promise<BookingEntity>{
       try {
           const book_ = new BookingEntity();
           book_.classId = body.classId;
           book_.classId = ''
           const booking = await this.bookingRepository.create()
           return booking
       } catch (error) {
        const error_ = new Error();
        error_.message = 'Post not found';
        error_.stack = `${HttpStatus.NOT_FOUND}`;
        throw error_;
       }

    } 

}
