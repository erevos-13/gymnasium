import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateUserInput {


    @IsNotEmpty()
    @IsNumber()
    role?: number;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    gymId: string;

   

}

