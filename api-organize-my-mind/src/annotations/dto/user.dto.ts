import { Expose } from "class-transformer";

export class UserAnnotationDto {

    @Expose()
    userId: number;

}