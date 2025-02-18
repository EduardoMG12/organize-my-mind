import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOrder {

    @IsNotEmpty()
    @IsString()
    @Expose()
    id: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    newPosition: number;
}
