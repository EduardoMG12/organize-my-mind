import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @Expose()
    name: string

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    @MinLength(6)
    password: string;
}
