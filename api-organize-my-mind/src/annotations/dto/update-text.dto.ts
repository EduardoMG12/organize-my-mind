import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnotationDto {
    @IsString()
    text?: string;

}
