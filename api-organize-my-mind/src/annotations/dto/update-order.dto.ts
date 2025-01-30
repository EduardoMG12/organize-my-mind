import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsInt()
    newPosition: number;
}
