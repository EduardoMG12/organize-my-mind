import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Flashcard } from "./flashcard.entity";

@Entity("flashcard_collection")
export class FlashcardCollection {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@ManyToOne(
		() => User,
		(user) => user.flashcardCollection,
	)
	owner: User;

	@Column()
	visibility: string;

	@Column()
	position: number;

	@Column()
	isActive: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ type: "date", nullable: true })
	deleted_at: Date;

	@OneToMany(
		() => Flashcard,
		(flashcard) => flashcard.flashcards,
		{
			cascade: true,
		},
	)
	flashcards: Flashcard[];
}
