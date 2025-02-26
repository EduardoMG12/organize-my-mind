import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { GetUserId } from "src/common/decorators/getUserId.decorator";
import { toPlainToInstance } from "src/common/utils/toPlainToInstance";
import {
	FlashcardsCollectionSafeMissingFlashcardsDto as FlashcardCollectionSafeMissingCardsDto,
	FlashcardCollectionSafeDto,
} from "./dto/flashcards-safe.dto";
import { FlashcardCollectionsService } from "./flashcard-collections.service";
import { CreateFlashcardCollectionDto } from "./dto/create.dto";
import { CreateFlashcardsDto } from "src/card/dto/create-cards.dto";

@Controller("flashcard-collections")
export class FlashcardCollectionsController {
	constructor(
		private readonly flashcardCollectionService: FlashcardCollectionsService,
	) {}

	@Post()
	async create(
		@GetUserId() userId: string,
		@Body() createFlashcardCollectionDto: CreateFlashcardCollectionDto,
	): Promise<FlashcardCollectionSafeMissingCardsDto> {
		return toPlainToInstance(
			FlashcardCollectionSafeMissingCardsDto,
			await this.flashcardCollectionService.create(
				userId,
				createFlashcardCollectionDto,
			),
		);
	}

	@Get()
	async findAll(
		@GetUserId() userId: string,
	): Promise<FlashcardCollectionSafeMissingCardsDto[]> {
		return toPlainToInstance(
			FlashcardCollectionSafeMissingCardsDto,
			await this.flashcardCollectionService.findAll(userId),
		);
	}

	@Post("/flashcards")
	async createFlashcard(
		@GetUserId() userId: string,
		@Body() createFlashcardDto: CreateFlashcardsDto,
	): Promise<FlashcardCollectionSafeDto> {
		return toPlainToInstance(
			FlashcardCollectionSafeDto,
			await this.flashcardCollectionService.createFlashcard(
				userId,
				createFlashcardDto,
			),
		);
	}

	// @Get()
	// async findOne(@GetUserId() userId: string, FindOneFlashcardCollectionsDto): {
	//     return toPlainToInstance(FindOneFlashcardCollectionsDto, this.FlashcardCollectionsService.findOne())
	// }; // Return a specific FlashcardCollection .

	// @Patch()
	// async update(@GetUserId() userId: string, UpdateFlashcardCollectionsDto): {
	//     return toPlainToInstance(UpdateFlashcardCollectionsDto, this.FlashcardCollectionsService.update())
	// }; // Update a FlashcardCollection.

	// @Delete()
	// async remove(@GetUserId() userId: string, RemoveFlashcardCollectionsDto): {
	//     return toPlainToInstance(RemoveFlashcardCollectionsDto, this.FlashcardCollectionsService.remove())
	// }; // Deleta a FlashcardCollection.

	// @Get()
	// async findFlashcards(@GetUserId() userId: string, FindFlashcardsFlashcardCollectionsDto): {
	//     return toPlainToInstance(FindFlashcardsFlashcardCollectionsDto, this.FlashcardCollectionsService.findFlashcards())
	// }; // List all Flashcards of a FlashcardCollection
}
