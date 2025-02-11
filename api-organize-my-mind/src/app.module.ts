import { AuthController } from './auth/auth.controller';
import { Body, Controller, Module, Post, Request, Response } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnotationsModule } from './annotations/annotations.module';
import { AnnotationsController } from './annotations/annotations.controller';
import { ChallengesController } from './challenges/challenges.controller';
import { GoalsController } from './goals/goals.controller';
import { UsersController } from './users/users.controller';
import { ChallengesModule } from './challenges/challenges.module';
import { GoalsModule } from './goals/goals.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DeleteSchedulerService } from './delete-scheduler/delete-scheduler.service';
import { DeleteSchedulerController } from './delete-scheduler/delete-scheduler.controller';
import { DeleteSchedulerModule } from './delete-scheduler/delete-scheduler.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 3306,
            username: process.env.DATABASE_USER || 'user',
            password: process.env.DATABASE_PASSWORD || 'password',
            database: process.env.DATABASE_NAME || 'organize_my_mind',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            synchronize: true,
        }),
        AnnotationsModule, ChallengesModule, GoalsModule, UsersModule, AuthModule, DeleteSchedulerModule
    ],
    controllers: [
        AppController, AnnotationsController, ChallengesController, GoalsController, UsersController, DeleteSchedulerController],
    providers: [AppService, DeleteSchedulerService],
})
export class AppModule { }
