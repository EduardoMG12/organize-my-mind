import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { SafeUser } from './dto/safeUser.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { AccessToken } from './dto/accessToken.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// read about @SerializeOptionsType for returns controller include plainToInstance global for Exclude and Expose

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.', type: SafeUser })
    @ApiResponse({ status: 400, description: 'Failed to register user.' })
    async register(@Body() registerDto: RegisterDto): Promise<SafeUser> {

        return toPlainToInstance(SafeUser, await this.authService.register(registerDto))
    }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Authenticate user and obtain JWT token' })
    @ApiResponse({ status: 200, description: 'Successful login.', type: AccessToken })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginDto: LoginDto): Promise<AccessToken> {
        return toPlainToInstance(AccessToken, this.authService.login(loginDto))
    }

}