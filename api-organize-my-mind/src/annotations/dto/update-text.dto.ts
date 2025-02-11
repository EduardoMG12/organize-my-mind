import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { userIdDto } from './userId.dto';

export class UpdateTextAnnotationDto extends userIdDto {
    @IsString()
    @Expose()
    text?: string;

    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;

}
