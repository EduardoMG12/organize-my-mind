import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    @Expose()
    user: number;

    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;

    @IsNotEmpty()
    @IsInt()
    @Expose()
    newPosition: number;
}
