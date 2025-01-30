import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnotationsModule } from './annotations/annotations.module';
import { AnnotationsController } from './annotations/annotations.controller';
import { ChallengesModule } from './challenges/challenges.module';
import { ChallengesController } from './challenges/challenges.controller';
import { GoalsModule } from './goals/goals.module';
import { GoalsController } from './goals/goals.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 3306,
            username: process.env.DATABASE_USER || 'user',
            password: process.env.DATABASE_PASSWORD || 'password',
            database: process.env.DATABASE_NAME || 'organize_my_mind',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            synchronize: false, // Usaremos migrations
        }),
        AnnotationsModule, ChallengesModule, GoalsModule, UsersModule
    ],
    controllers: [AppController, AnnotationsController, ChallengesController, GoalsController, UsersController],
    providers: [AppService],
})
export class AppModule { }
