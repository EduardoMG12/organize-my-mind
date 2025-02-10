import { IsEmail, IsString, MinLength } from 'class-validator';
import { BaseUser } from './baseUser.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends BaseUser {
    @ApiProperty({ example: 'SecurePass123!', description: 'User password (min 6 characters)' })
    @IsString()
    @MinLength(6)
    @Expose()
    password: string;
}
