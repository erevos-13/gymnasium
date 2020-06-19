import { IsNotEmpty,IsString, IsNumber } from 'class-validator';

export class ClassTypeInput {

    @IsNotEmpty()
    @IsNumber()
    type?:number;

    @IsNotEmpty()
    @IsString()
    value?: string;

    @IsNotEmpty()
    @IsString()
    name?: string;

   

}