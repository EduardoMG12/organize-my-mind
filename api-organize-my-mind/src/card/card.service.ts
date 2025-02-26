import { Injectable } from "@nestjs/common";
import { FlashcardCollection } from "src/entities/flashcards.entity";
import { Flashcard } from "src/entities/flashcard.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { CreateFlashcardsDto } from "./dto/create-cards.dto";

@Injectable()
export class CardService {
	constructor(
		@InjectRepository(Flashcard)
		private cardRepository: Repository<Flashcard>,
		private usersService: UsersService,
	) {}

	// findOne: Lida com a lógica de retorno de um Flashcard específico dentro de um FlashcardCollection.
	// update: Lida com a lógica de atualização de um Flashcard específico.
	// remove: Lida com a lógica de exclusão de um Flashcard específico.

	async createMany(
		userId: string,
		createFlashcardDtos: CreateFlashcardsDto,
		flashcardCollection: FlashcardCollection,
	): Promise<Flashcard[]> {
		const createdFlashcards: Flashcard[] = [];
		let currentPosition = 0; // after thinking about how can i make order ! important !

		for (const createFlashcardDto of createFlashcardDtos.flashcards) {
			const flashcard = this.cardRepository.create({
				front: createFlashcardDto.front,
				back: createFlashcardDto.back,
				description: createFlashcardDto.description || "",
				flashcards: flashcardCollection,
				position: currentPosition++,
			});

			const savedFlashcard = await this.cardRepository.save(flashcard);
			createdFlashcards.push(savedFlashcard);
		}

		return createdFlashcards;
	}
}
