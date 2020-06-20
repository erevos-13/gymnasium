import { IsEmail, IsNotEmpty, IsAlphanumeric, MinLength, Length, IsBoolean, IsNumber, IsSemVer, IsString } from 'class-validator';

export class UserUpdateInput {


    @IsEmail()
    email?: string;

    
    password?: string;

    @IsString()
    username?: string;

    @IsString()
    lastname?: string;



}