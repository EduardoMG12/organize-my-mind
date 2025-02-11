import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("annotations")
export class Annotation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.annotations, { onDelete: "CASCADE" })
    user: User;

    @Column({ length: 255 })
    title: string;

    @Column("text")
    content: string;

    @Column({ default: 0 })
    position: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}
