import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";

@Entity("item_groups")
export class ItemGroup {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
    owner: User;

    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[];

    @Column({ default: "PRIVATE" })
    visibility: "PUBLIC" | "PRIVATE" | "UNLISTED";

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}
