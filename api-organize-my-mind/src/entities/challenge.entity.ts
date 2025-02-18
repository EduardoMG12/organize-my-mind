import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Item } from "./item.entity";


@Entity("challenges")
export class Challenge {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, item => item.id, { onDelete: "CASCADE" })
    item: Item;

    @Column()
    frequency: number;

    @Column("date")
    next_due_date: Date;

    @Column({ default: 0 })
    priority: number;

    // @OneToMany(() => ChallengeHistory, history => history.challenge)
    // history: ChallengeHistory[];
}
