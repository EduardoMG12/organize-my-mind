import { IsEmail, IsString, MinLength } from 'class-validator';
import { BaseUser } from './baseUser.dto';
import { Expose } from 'class-transformer';

export class LoginDto extends BaseUser {
    @IsString()
    @MinLength(6)
    @Expose()
    password: string;
}
