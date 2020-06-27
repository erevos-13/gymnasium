import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { isString } from 'util';

export class NewsFeedInput {

    @IsOptional()
    @IsString()
    id: string;

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
