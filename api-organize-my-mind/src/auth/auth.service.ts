import { RegisterDto } from 'src/auth/dto/register.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(loginDto: LoginDto) {
        const payload = { email: loginDto.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        try {
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);

            const newUser = { ...registerDto };
            newUser.password = hashedPassword;

            const createUser = await this.usersService.createUser(newUser);

            const { password, ...publicUser } = createUser
            return publicUser;
        }
        catch (err) {
            console.error("Error during registration:", err);
            if (err.code === '23505') {
                throw new BadRequestException('Email already exists.');
            }
            throw new BadRequestException('Registration failed.');
        }

    }

}
