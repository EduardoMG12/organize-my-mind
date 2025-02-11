import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Challenge } from "./challenge.entity";

@Entity("challenge_history")
export class ChallengeHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Challenge, challenge => challenge.history, { onDelete: "CASCADE" })
    challenge: Challenge;

    @Column("date")
    completion_date: Date;

    @Column("text", { nullable: true })
    note: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
