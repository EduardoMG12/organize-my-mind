import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";

@Entity("habits")
export class Habit {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, item => item.id, { onDelete: "CASCADE" })
    item: Item;

    @Column()
    frequency: string;

    @Column({ default: false })
    completed_today: boolean;

}