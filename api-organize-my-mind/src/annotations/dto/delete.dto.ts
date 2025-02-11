import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteAnnotationDto {
    @IsNotEmpty()
    @IsInt()
    @Expose()
    id: number;
}