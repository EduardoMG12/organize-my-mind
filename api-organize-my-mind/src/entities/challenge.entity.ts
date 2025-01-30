import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { ChallengeHistory } from "./challenge-history.entity";


@Entity("challenges")
export class Challenge {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.challenges, { onDelete: "CASCADE" })
    user: User;

    @Column({ length: 255 })
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @Column()
    frequency: number;

    @Column("date")
    next_due_date: Date;

    @Column({ default: 0 })
    priority: number;

    @Column({ default: 0 })
    position: number;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => ChallengeHistory, history => history.challenge)
    history: ChallengeHistory[];
}
