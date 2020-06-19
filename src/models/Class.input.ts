import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ClassInput {

    @IsNotEmpty()
    @IsNumber()
    classId?: number;

    @IsNotEmpty()
    @IsString()
    hour?: string;

    @IsNotEmpty()
    @IsString()
    date?: string;


    @IsNotEmpty()
    @IsNumber()
    attendants: number;

    

    @IsNotEmpty()
    @IsNumber()
    CreatedAt: number;

    @IsNotEmpty()
    @IsNumber()
    UpdatedAt: number;

    @IsNotEmpty()
    @IsNumber()
    maxParticipant: number;
   

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