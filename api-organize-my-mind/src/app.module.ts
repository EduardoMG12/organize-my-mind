import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ChallengesModule } from './challenges/challenges.module';
import { GoalsModule } from './goals/goals.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AnnotationsModule } from './annotations/annotations.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST || 'db',
            port: Number(process.env.DATABASE_PORT) || 3306,
            username: process.env.DATABASE_USER || 'user',
            password: process.env.DATABASE_PASSWORD || 'password',
            database: process.env.DATABASE_NAME || 'organize_my_mind',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            synchronize: true,
        }),
         ChallengesModule, GoalsModule, UsersModule, AuthModule, AnnotationsModule
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule { }
