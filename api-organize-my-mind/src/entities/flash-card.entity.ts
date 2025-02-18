import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlashcardSet } from "./flash-card-set.entity";

@Entity("flash_cards")
export class Flashcard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    front: string;

    @Column()
    back: string;

    @ManyToOne(() => FlashcardSet, set => set.flashcards, { onDelete: "CASCADE" })
    set: FlashcardSet;
}