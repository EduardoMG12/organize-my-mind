import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateAnnotationDto } from './create.dto';

export class UpdateAnnotationDto extends CreateAnnotationDto {
    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;
}
