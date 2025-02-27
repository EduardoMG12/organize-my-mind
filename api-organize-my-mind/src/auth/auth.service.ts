import { RegisterDto } from "../auth/dto/register.dto";
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { AccessToken } from "./dto/accessToken.dto";
import { SafeUser } from "./dto/safeUser.dto";
import { BcryptAdapter } from "../common/adapter/bcrypt.adapter";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly bcryptAdapter: BcryptAdapter,
	) {}

	async register(registerDto: RegisterDto): Promise<SafeUser> {
		const user = await this.usersService.findByEmail(registerDto.email, false);
		if (user) {
			throw new BadRequestException("User already exist");
		}
		const hashedPassword = await this.bcryptAdapter.hash(registerDto.password);

		const newUser = { ...registerDto };
		newUser.password = hashedPassword;

		const createUser = await this.usersService.createUser(newUser);

		const { password, ...publicUser } = createUser;
		return publicUser;
	}

	async login(loginDto: LoginDto): Promise<AccessToken> {
		try {
			const user = await this.usersService.findByEmail(loginDto.email);

			if (!user) {
				throw new UnauthorizedException("Invalid email or password.");
			}

			const isPasswordValid = await this.bcryptAdapter.compare(
				loginDto.password,
				user.password,
			);
			if (!isPasswordValid) {
				throw new UnauthorizedException("Invalid email or password.");
			}

			const payload = { id: user.id, email: user.email };
			const access_token = this.jwtService.sign(payload);

			return { access_token };
		} catch (err) {
			throw new UnauthorizedException(err.message || "Login failed");
		}
	}
}
