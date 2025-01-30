import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnnotationDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content?: string;

}
