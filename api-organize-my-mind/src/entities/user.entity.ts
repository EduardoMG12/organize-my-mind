import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, DeleteDateColumn, JoinTable} from "typeorm";
import { Annotation } from "./annotation.entity";
// import { Challenge } from "./challenge.entity";
// import { FlashcardSet } from "./flash-card-set.entity";
// import { Goal } from "./goal.entity";
// import { Habit } from "./habit.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ length: 100 })
    fullName: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ nullable: true })
    bio: string;

    @Column()
    password: string;

    @OneToMany(() => Annotation, annotation => annotation.owner)
    @JoinTable()
    annotations: Annotation[];

    // @OneToMany(() => Challenge, challenge => challenge.owner)
    // @JoinTable()
    // challenges: Challenge[];

    // @OneToMany(() => FlashcardSet, flashcardSet => flashcardSet.owner)
    // @JoinTable()
    // flashcardSets: FlashcardSet[];

    // @OneToMany(() => Goal, goal => goal.owner)
    // @JoinTable()
    // goals: Goal[];

    // @OneToMany(() => Habit, habit => habit.owner)
    // @JoinTable()
    // habits: Habit[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
