import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flashcard } from "./flash-card.entity";
import { Item } from "./item.entity";

@Entity("flashcards_set")
export class FlashcardSet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Flashcard, flashcard => flashcard.set)
    flashcards: Flashcard[];

    @ManyToOne(() => Item, item => item.id, { onDelete: "CASCADE" })
    item: Item;
}
