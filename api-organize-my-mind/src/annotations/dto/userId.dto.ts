import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class userIdDto {
    @IsNumber()
    @IsNotEmpty()
    @Expose()
    userId: number;

}