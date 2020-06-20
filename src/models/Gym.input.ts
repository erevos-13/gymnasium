
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
export class GymInput {


    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

}
