import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class BaseUser {
    @IsEmail()
    @Expose()
    email: string;
}