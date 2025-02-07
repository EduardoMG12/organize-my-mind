import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';
import { Expose } from 'class-transformer';

export class RegisterDto extends LoginDto {
    @IsString()
    @Expose()
    name: string

}
