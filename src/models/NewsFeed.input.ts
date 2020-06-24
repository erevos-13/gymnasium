import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class NewsFeedInput {

    @IsOptional()
    @IsBoolean()
    active?:number;

    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsNotEmpty()
    @IsString()
    message?: string;

    @IsOptional()
    @IsString()
    gymId: string;

    @IsOptional()
    @IsString()
    userId: string;

}
