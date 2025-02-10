import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends LoginDto {
    @ApiProperty({ example: 'john Smith', description: 'User full name' })
    @IsString()
    @Expose()
    name: string

}
