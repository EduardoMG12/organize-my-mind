import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { ItemType } from "./item-types.entity";

@Entity("items")
export class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // @OneToMany(() => An) aqui eu precisaria que tivesse um id para fazer referencia ao annotation | challenge | flashCards | habit | etc correto? ou o itemType faria isso, como consigo achar esses dados dessa entidade pelas outras
    // preciso de uma referencia para saber qual item(instancia(annotation | challenge | flashCards | habit)) esta se relacionando com qual instancia dessa tabela

    @ManyToOne(() => User, user => user.items, { onDelete: "CASCADE" })
    owner: User;

    @ManyToOne(() => ItemType, itemType => itemType.id, {onDelete: "CASCADE"})
    type: ItemType;

    @Column({ length: 255 })
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @Column({ default: "PRIVATE" })
    visibility: "PUBLIC" | "UNLISTED" | "PRIVATE";

    @Column({ default: 0 })
    position: number;

    @Column({ default: true})
    activy: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}
