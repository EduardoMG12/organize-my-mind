import { FlashcardCollection } from "./../entities/flashcards.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateFlashcardCollectionDto } from "./dto/create-flashcard-collections.dto";
import type { FlashcardCollectionSafeDto } from "./dto/flashcard-collection-safe.dto";
import { InjectRepository } from "@nestjs/typeorm";
import type { UsersService } from "src/users/users.service";
import type { Repository } from "typeorm";
import type { UpdateFlashcardCollectionDto } from "./dto/update-flashcards-collection.dto";

@Injectable()
export class FlashcardCollectionsService {
	constructor(
		@InjectRepository(FlashcardCollection)
		private flashcardCollectionRepository: Repository<FlashcardCollection>,
		private usersService: UsersService,
	) {}

	async create(
		userId: string,
		createFlashcardCollectionDto: CreateFlashcardCollectionDto,
	): Promise<FlashcardCollectionSafeDto> {
		const owner = await this.usersService.findById(userId);

		const flashcardCollection = this.flashcardCollectionRepository.create({
			...createFlashcardCollectionDto,
			owner: owner,
		});

		const savedFlashcardCollection =
			await this.flashcardCollectionRepository.save(flashcardCollection);

		return this.toSafeDto(savedFlashcardCollection);
	}

	async findAll(userId: string): Promise<FlashcardCollectionSafeDto[]> {
		const flashcardCollections = await this.flashcardCollectionRepository.find({
			where: { owner: { id: userId } },
			relations: ["owner"],
		});
		return flashcardCollections.map(this.toSafeDto);
	}

	async findOne(
		id: string,
		userId: string,
	): Promise<FlashcardCollectionSafeDto> {
		const flashcardCollection =
			await this.flashcardCollectionRepository.findOne({
				where: { id, owner: { id: userId } },
				relations: ["owner"],
			});
		if (!flashcardCollection) {
			throw new NotFoundException(
				`FlashcardCollection with ID ${id} not found`,
			);
		}
		return this.toSafeDto(flashcardCollection);
	}
	// findOne: Lida com a lógica de retorno de um FlashcardCollection específico.

	async update(
		id: string,
		userId: string,
		updateFlashcardCollectionDto: UpdateFlashcardCollectionDto,
	): Promise<FlashcardCollectionSafeDto> {
		const owner = await this.usersService.findById(userId);
		const { title, description, visibility, position, isActive } =
			updateFlashcardCollectionDto;

		const existingFlashcardCollection =
			await this.flashcardCollectionRepository.findOne({
				where: { id, owner },
			});

		if (!existingFlashcardCollection) {
			throw new NotFoundException(
				`FlashcardCollection with ID ${id} not found`,
			);
		}

		existingFlashcardCollection.title =
			title ?? existingFlashcardCollection.title;
		existingFlashcardCollection.description =
			description ?? existingFlashcardCollection.description;
		existingFlashcardCollection.visibility =
			visibility ?? existingFlashcardCollection.visibility;
		existingFlashcardCollection.position =
			position ?? existingFlashcardCollection.position;
		existingFlashcardCollection.isActive =
			isActive ?? existingFlashcardCollection.isActive;

		await this.flashcardCollectionRepository.update(
			id,
			existingFlashcardCollection,
		);

		return existingFlashcardCollection;
	}

	async remove(id: string, userId: string): Promise<void> {
		const flashcardCollection =
			await this.flashcardCollectionRepository.findOne({
				where: { id, owner: { id: userId } },
			});

		if (!flashcardCollection) {
			throw new NotFoundException(
				`FlashcardCollection with ID ${id} not found`,
			);
		}

		await this.flashcardCollectionRepository.remove(flashcardCollection);
	}

	async createFlashcard() {} // createFlashcard: Lida com a lógica de criação de um novo Flashcard dentro de um FlashcardCollection.

	async findFlashcards() {} // findFlashcards: Lida com a lógica de listagem de todos os Flashcards de um FlashcardCollection.

	private toSafeDto(
		flashcardCollection: FlashcardCollection,
	): FlashcardCollectionSafeDto {
		const {
			id,
			title,
			description,
			visibility,
			position,
			isActive,
			created_at,
			updated_at,
		} = flashcardCollection;
		return {
			id,
			title,
			description,
			visibility,
			position,
			isActive,
			created_at,
			updated_at,
		};
	}
}
