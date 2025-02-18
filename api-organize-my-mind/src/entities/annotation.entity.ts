import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { User } from "./user.entity";

export enum Visibility {
    PUBLIC = "public",
    PRIVATE = "private",
    FRIENDS_ONLY = "friends_only"
}

@Entity("annotations")
export class Annotation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text", { nullable: true })
    content: string;
    
    @Column({ length: 255 })
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.annotations, { onDelete: "CASCADE" })
    owner: User;

    @Column({ type: "enum", enum: Visibility, default: "PRIVATE" })
    visibility: Visibility;

    @Column()
    position: number;

    @Column({ default: true})
    activy: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true })
    deleted_at: Date|null;
}
