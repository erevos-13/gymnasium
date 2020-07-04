import { IsNotEmpty,IsString } from 'class-validator';

export class TokenValidateInput {

    @IsNotEmpty()
    @IsString()
    token?: string;


}