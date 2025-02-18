import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTextAnnotationDto {
    @IsString()
    @Expose()
    text?: string;

    @IsNotEmpty()
    @Expose()
    id: string;

}
