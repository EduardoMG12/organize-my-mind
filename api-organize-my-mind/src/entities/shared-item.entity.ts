import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";

@Entity("shared_items")
export class SharedItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Item, item => item.id, { onDelete: "CASCADE" })
    item: Item;

    @ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "varchar", length: 20 })
    permission: "READ" | "WRITE" | "OWNER";

    @Column({ type: "varchar", nullable: true, unique: true, length: 255 })
    shared_link?: string;
    
    @Column({ type: "timestamp", nullable: true })
    expiration?: Date;

    @Column({ type: "int", nullable: true })
    max_uses?: number;

    @Column({ type: "int", default: 0 })
    uses: number;

    @CreateDateColumn()
    created_at: Date;
}
