import { Controller, Post } from "@nestjs/common";
import { GetUserId } from "src/decorators/getUserId";
import { toPlainToInstance } from "src/utils/toPlainToInstance";
import { CreateFlashcardDto } from "./dto/create-flashcard.dto";
import { FlashcardSafeDto } from "./dto/flashcardSafe.dto";

@Controller("flashcard")
export class FlashcardController {
	// @Post()
	// async create(
	//     @GetUserId() userId: string,
	//     createFlashcardDto: CreateFlashcardDto,
	// ): Promise<FlashcardSafeDto> {
	//     return toPlainToInstance(FlashcardSafeDto);
	// }
	// findOne: Retorna um Flashcard específico dentro de um FlashcardCollection.
	// update: Atualiza um Flashcard específico.
	// remove: Deleta um Flashcard específico.
	// GET /flashcard-collections/:collectionId/flashcards/:id: Retorna um Flashcard específico dentro de um FlashcardCollection.
	// PATCH /flashcard-collections/:collectionId/flashcards/:id: Atualiza um Flashcard específico.
	// DELETE /flashcard-collections/:collectionId/flashcards/:id: Deleta um Flashcard específico.
}
