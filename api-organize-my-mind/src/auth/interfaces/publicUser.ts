import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { Annotation } from 'src/entities/annotation.entity';
import { Challenge } from 'src/entities/challenge.entity';
import { Goal } from 'src/entities/goal.entity';

export class PublicUser {
    id: number;
    name: string
    email: string
    created_at: Date;
    annotations: Annotation[];
    challenges: Challenge[];
    goals: Goal[];
}
