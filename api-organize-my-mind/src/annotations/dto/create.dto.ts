import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnotationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content?: string;
}
