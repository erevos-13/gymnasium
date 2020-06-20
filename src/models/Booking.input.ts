import { IsNotEmpty,IsString } from 'class-validator';

export class BookingInput {

    @IsNotEmpty()
    classId?: string;

}