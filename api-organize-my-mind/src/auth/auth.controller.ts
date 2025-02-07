import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { SafeUser } from './dto/safeUser.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { AccessToken } from './dto/accessToken.dto';
// create routesAuth doc and 
// read about @SerializeOptionsType for returns controller include plainToInstance global for Exclude and Expose

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<SafeUser> {

        return toPlainToInstance(SafeUser, await this.authService.register(registerDto))
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<AccessToken> {
        return toPlainToInstance(AccessToken, this.authService.login(loginDto))
    }

}