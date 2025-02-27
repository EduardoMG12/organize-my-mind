import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { RegisterDto } from "src/auth/dto/register.dto";
import { SafeUser } from "src/auth/dto/safeUser.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async createUser(registerDto: RegisterDto): Promise<User> {
		const user = this.usersRepository.create(registerDto);
		return this.usersRepository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { email } });
		if (!user) {
			throw new NotFoundException("User not found");
		}
		return user;
	}

	async findById(id: string): Promise<SafeUser> {
		const user = await this.usersRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException("User not found");
		}
		return user;
	}
}
