import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { GetUserId } from "src/decorators/getUserId";
import { toPlainToInstance } from "src/utils/toPlainToInstance";
import { FlashcardCollectionSafeDto } from "./dto/flashcard-collection-safe.dto";
import type { FlashcardCollectionsService } from "./flashcard-collections.service";
import type { CreateFlashcardCollectionDto } from "./dto/create-flashcard-collections.dto";

@Controller("flashcard-collections")
export class FlashcardCollectionsController {
	constructor(
		private readonly flashcardCollectionService: FlashcardCollectionsService,
	) {}

	@Post()
	async create(
		@GetUserId() userId: string,
		@Body() createFlashcardCollectionDto: CreateFlashcardCollectionDto,
	): Promise<FlashcardCollectionSafeDto> {
		return toPlainToInstance(
			FlashcardCollectionSafeDto,
			await this.flashcardCollectionService.create(
				userId,
				createFlashcardCollectionDto,
			),
		);
	}

	// @Post()
	// async createFlashcard(@GetUserId() userId: string, CreateFlashcardFlashcardCollectionsDto): {
	//     return toPlainToInstance(CreateFlashcardFlashcardCollectionsDto, this.FlashcardCollectionsService.createFlashcard())
	// }; // Crate a new Flashcard inside FlashcardCollection.

	// @Get()
	// async findAll(@GetUserId() userId: string, FindAllFlashcardCollectionsDto): {
	//     return toPlainToInstance(FindAllFlashcardCollectionsDto, this.FlashcardCollectionsService.findAll())
	// }; // List all FlashcardCollections of user.

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
	// }; // List all Flashcards of a FlashcardCollection.
}
