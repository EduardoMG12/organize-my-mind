import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { FlashcardCollection } from "./flashcards.entity";

@Entity("flashcard")
export class Flashcard {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(
		() => FlashcardCollection,
		(flashcardCollection) => flashcardCollection.flashcards,
	)
	flashcards: FlashcardCollection;

	@Column("text")
	front: string;

	@Column("text")
	back: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	position: number;

	@Column()
	isActive: boolean;
}
