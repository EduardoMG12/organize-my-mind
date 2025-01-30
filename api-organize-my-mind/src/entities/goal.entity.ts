import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("goals")
export class Goal {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.goals, { onDelete: "CASCADE" })
    user: User;

    @Column({ length: 255 })
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("date", { nullable: true })
    deadline: Date;

    @Column({ default: 0 })
    priority: number;

    @Column({ default: 0 })
    position: number;

    @CreateDateColumn()
    created_at: Date;
}
