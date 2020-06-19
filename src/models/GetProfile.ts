import { IsEmail, IsNotEmpty, IsAlphanumeric, MinLength, Length, IsString } from 'class-validator';

export class GetProfile {
    
    @IsNotEmpty()
    @IsString()
    userId: string;

}