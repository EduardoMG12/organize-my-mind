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

@Module({
  imports: [AnnotationsModule, ChallengesModule, GoalsModule, UsersModule],
  controllers: [AppController, AnnotationsController, ChallengesController, GoalsController, UsersController],
  providers: [AppService],
})
export class AppModule { }
