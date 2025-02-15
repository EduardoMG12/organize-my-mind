import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from "typeorm";
import { Annotation } from "./annotation.entity";
import { Challenge } from "./challenge.entity";
import { Goal } from "./goal.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ nullable: true })
    bio: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Annotation, annotation => annotation.owner)
    annotations: Annotation[];

    @OneToMany(() => Challenge, challenge => challenge.user)
    challenges: Challenge[];

    @OneToMany(() => Goal, goal => goal.user)
    goals: Goal[];
}
