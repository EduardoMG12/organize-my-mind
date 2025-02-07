import { IsEmail, IsString, MinLength } from 'class-validator';
import { BaseUser } from './baseUser.dto';

export class LoginDto extends BaseUser {
    @IsString()
    @MinLength(6)
    password: string;
}
