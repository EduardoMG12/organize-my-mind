import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnnotationDto {
    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string;

    @IsString()
    @Expose()
    content?: string;
}
