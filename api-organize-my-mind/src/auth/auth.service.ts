import { RegisterDto } from 'src/auth/dto/register.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { AccessToken } from './dto/accessToken.dto';
import { SafeUser } from './dto/safeUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<SafeUser> {
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

    async login(loginDto: LoginDto): Promise<AccessToken> {
        try {

            const user = await this.usersService.findByEmail(loginDto.email);

            if (!user) {
                throw new UnauthorizedException('Invalid email or password.')
            }

            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid email or password.")
            }

            const payload = { id: user.id, email: user.email }
            const access_token = this.jwtService.sign(payload)

            return { access_token };
        } catch (err) {
            throw new UnauthorizedException(err.message || 'Login failed')
        }


    }

}
