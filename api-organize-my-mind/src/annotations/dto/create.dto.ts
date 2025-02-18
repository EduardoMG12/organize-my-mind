import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateAnnotationDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string;

    @IsString()
    @Expose()
    content?: string;

    @IsString()
    @Expose()
    description: string;
}
