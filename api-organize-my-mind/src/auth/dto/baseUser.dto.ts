import { IsEmail } from "class-validator";

export class BaseUser {
    @IsEmail()
    email: string;
}