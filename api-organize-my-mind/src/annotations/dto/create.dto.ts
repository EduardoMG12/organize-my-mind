import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { userIdDto } from './userId.dto';

export class CreateAnnotationDto extends userIdDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string;

    @IsString()
    @Expose()
    content?: string;
}
