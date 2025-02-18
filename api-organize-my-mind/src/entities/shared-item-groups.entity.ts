import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemGroup } from "./item-group.entity";
import { User } from "./user.entity";

@Entity("shared_item_groups")
export class SharedItemGroup {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ItemGroup, group => group.id, { onDelete: "CASCADE" })
    group: ItemGroup;

    @ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
    user: User

    @Column({ type: "varchar", length: 20 })
    permission: "READ" | "WRITE" | "OWNER";

    @CreateDateColumn()
    created_at: Date;
}
