import { IsEmail, IsNotEmpty, IsAlphanumeric, MinLength, Length, IsBoolean, IsNumber, IsSemVer, IsString, IsOptional } from 'class-validator';

export class UserInput {

    userId?:string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @Length(8)
    password?: string;

    @IsNotEmpty()
    username?: string;

    @IsNotEmpty()
    lastname?: string;


    @IsNumber()
    @IsOptional()
    role?: number

    @IsNotEmpty()
    @IsString()
    gymId:string;



}