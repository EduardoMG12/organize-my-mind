import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDto {

    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    newPosition: number;
}
