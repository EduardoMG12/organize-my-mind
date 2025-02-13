import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SafeUser } from './dto/safeUser.dto';
import { AccessToken } from './dto/accessToken.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
    let authController: AuthController;
    let fakeAuthService: Partial<AuthService>;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {

        fakeAuthService = {
            register: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com' } as SafeUser),
            login: jest.fn().mockResolvedValue({ access_token: 'fake-jwt-token' } as AccessToken),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: fakeAuthService }]
        }).compile();

        authController = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    it('should register a new user', async () => {
        const registerDto: RegisterDto = { name: "teste", email: 'test@example.com', password: '123456' };

        const result = await authController.register(registerDto);

        expect(result).toEqual({ id: 1, email: 'test@example.com' });
        expect(fakeAuthService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should login a user and return access token', async () => {
        const loginDto: LoginDto = { email: 'test@example.com', password: '123456' };

        const result = await authController.login(loginDto);

        expect(result).toEqual({ access_token: 'fake-jwt-token' });
        expect(fakeAuthService.login).toHaveBeenCalledWith(loginDto);
    })
})
