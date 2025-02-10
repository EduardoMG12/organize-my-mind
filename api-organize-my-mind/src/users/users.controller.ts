import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SafeUser } from 'src/auth/dto/safeUser.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('me')
    @ApiOperation({ summary: 'Get authenticated user profile' })
    @ApiResponse({ status: 200, description: 'Returns the authenticated user data.', type: SafeUser })
    @ApiResponse({ status: 401, description: 'Unauthorized request.' })
    async getProfile(@Request() req): Promise<SafeUser> {
        return toPlainToInstance(SafeUser, this.usersService.findById(req.user.id))
    }
}
