import { IsNotEmpty,IsString } from 'class-validator';

export class MetadataInput {

    @IsNotEmpty()
    @IsString()
    key?:string;

    @IsNotEmpty()
    @IsString()
    value?: string;

    @IsNotEmpty()
    @IsString()
    name?: string;



   

}