import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";;
import { Item } from "./item.entity";

@Entity("goals")
export class Goal {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, item => item.id, { onDelete: "CASCADE" })
    item: Item;

    @Column("date", { nullable: true })
    deadline: Date;

    @Column({ default: false })
    completed: boolean;

    @Column({ default: 0 })
    priority: number;

    @Column({ default: 0 })
    position: number;
}
