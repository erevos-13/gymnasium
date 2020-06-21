import { IsNotEmpty, IsString, IsNumber, IsEmpty, IsOptional } from 'class-validator';

export class ClassInput {


    @IsNotEmpty()
    @IsString()
    hour?: string;

    @IsNotEmpty()
    @IsNumber()
    dateStart?: number;

    @IsNotEmpty()
    @IsNumber()
    dateEnd?: number;

    @IsNotEmpty()
    @IsNumber()
    classType: number;

    @IsNumber()
    maxParticipant: number;

    @IsOptional()
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