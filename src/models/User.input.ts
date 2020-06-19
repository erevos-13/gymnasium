import { IsEmail, IsNotEmpty, IsAlphanumeric, MinLength, Length } from 'class-validator';

export class UserInput {

    userId?:string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @Length(8, 10)
    password?: string;

    @IsNotEmpty()
    username?: string;

    @IsNotEmpty()
    lastname?: string;



}