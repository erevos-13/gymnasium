import { IsNotEmpty,IsString } from 'class-validator';

export class BookingInput {

    @IsNotEmpty()
    @IsString()
    userId?:string;

    @IsNotEmpty()
    classId?: string;

}