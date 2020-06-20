import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ClassInput {


    @IsNotEmpty()
    @IsString()
    hour?: string;

    @IsNotEmpty()
    @IsString()
    date?: number;


    @IsNotEmpty()
    @IsNumber()
    classType: number;

    @IsNumber()
    maxParticipant: number;

    @IsNotEmpty()
    @IsString()
    gymId: string;
   

}

/**
 * id : string

classId: string

hour: string

date: string

attendants: number

classType: number

CreatedAt: number

UpdatedAt: number

max-participent: number
 */