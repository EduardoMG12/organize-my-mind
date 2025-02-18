import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity("annotations")
export class Annotation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, item => item.id, { onDelete: "CASCADE", eager: true })
    @JoinColumn()
    item: Item;

    @Column("text", { nullable: true })
    content: string;

}
