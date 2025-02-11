import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { userIdDto } from './userId.dto';

export class UpdateTitleAnnotationDto extends userIdDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string;

    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;

}
