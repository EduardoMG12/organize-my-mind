import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(registerDto: RegisterDto): Promise<User> {
        const user = this.usersRepository.create(registerDto);
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } })
    }
}
