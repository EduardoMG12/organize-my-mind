import { Expose } from 'class-transformer';
import { Annotation } from 'src/entities/annotation.entity';
import { Challenge } from 'src/entities/challenge.entity';
import { Goal } from 'src/entities/goal.entity';

export class SafeUser {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    created_at: Date;

    @Expose()
    annotations: Annotation[];

    @Expose()
    challenges: Challenge[];

    @Expose()
    goals: Goal[];
}
