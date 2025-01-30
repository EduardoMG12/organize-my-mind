import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Annotation } from "./annotation.entity";
import { Challenge } from "./challenge.entity";
import { Goal } from "./goal.entity";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column()
    password_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Annotation, annotation => annotation.user)
    annotations: Annotation[];

    @OneToMany(() => Challenge, challenge => challenge.user)
    challenges: Challenge[];

    @OneToMany(() => Goal, goal => goal.user)
    goals: Goal[];
}
