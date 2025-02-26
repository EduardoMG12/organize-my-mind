import { FlashcardCollection } from "./../entities/flashcards.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFlashcardCollectionDto } from "./dto/create.dto";
import {
	FlashcardsCollectionSafeMissingFlashcardsDto,
	FlashcardCollectionWithOwnerDto,
} from "./dto/flashcards-safe.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Visibility } from "src/common/interfaces/visibility.interfaces";
import { CardService } from "src/card/card.service";
import { CreateFlashcardsDto } from "src/card/dto/create-cards.dto";

@Injectable()
export class FlashcardCollectionsService {
	constructor(
		@InjectRepository(FlashcardCollection)
		private flashcardCollectionRepository: Repository<FlashcardCollection>,
		private usersService: UsersService,
		private cardService: CardService,
	) {}

	async create(
		userId: string,
		createFlashcardCollectionDto: CreateFlashcardCollectionDto,
	): Promise<FlashcardCollectionWithOwnerDto> {
		const owner = await this.usersService.findById(userId);

		const flashcardCollection = this.flashcardCollectionRepository.create({
			...createFlashcardCollectionDto,
			position: 0,
			isActive: true,
			owner: owner,
		});

		flashcardCollection.visibility =
			createFlashcardCollectionDto.visibility ?? Visibility.PRIVATE;

		flashcardCollection.description =
			createFlashcardCollectionDto.description ?? "";

		const savedFlashcardCollection =
			await this.flashcardCollectionRepository.save(flashcardCollection);

		return savedFlashcardCollection;
	}

	async findAll(
		userId: string,
	): Promise<FlashcardsCollectionSafeMissingFlashcardsDto[]> {
		const owner = await this.usersService.findById(userId);
		const flashcardCollections = (await this.flashcardCollectionRepository.find(
			{
				where: { owner: { id: owner.id } },
				relations: ["owner"],
			},
		)) as FlashcardsCollectionSafeMissingFlashcardsDto[];
		return flashcardCollections;
	}

	async findById(id: string, userId: string): Promise<FlashcardCollection> {
		const flashcardCollection =
			await this.flashcardCollectionRepository.findOne({
				where: { id, owner: { id: userId } },
				relations: ["owner", "flashcards"],
			});
		if (!flashcardCollection) {
			throw new NotFoundException(
				`FlashcardCollection with ID ${id} not found`,
			);
		}
		return flashcardCollection;
	}
	// findOne: Lida com a lógica de retorno de um FlashcardCollection específico.

	// async update(
	// 	id: string,
	// 	userId: string,
	// 	updateFlashcardCollectionDto: UpdateFlashcardCollectionDto,
	// ): Promise<FlashcardCollectionSafeDto> {
	// 	const owner = await this.usersService.findById(userId);
	// 	const { title, description, visibility, position, isActive } =
	// 		updateFlashcardCollectionDto;

	// 	const existingFlashcardCollection =
	// 		await this.flashcardCollectionRepository.findOne({
	// 			where: { id, owner },
	// 		});

	// 	if (!existingFlashcardCollection) {
	// 		throw new NotFoundException(
	// 			`FlashcardCollection with ID ${id} not found`,
	// 		);
	// 	}

	// 	existingFlashcardCollection.title =
	// 		title ?? existingFlashcardCollection.title;
	// 	existingFlashcardCollection.description =
	// 		description ?? existingFlashcardCollection.description;
	// 	existingFlashcardCollection.position =
	// 		position ?? existingFlashcardCollection.position;
	// 	existingFlashcardCollection.isActive =
	// 		isActive ?? existingFlashcardCollection.isActive;

	// 	let parsedVisibility: Visibility | undefined =
	// 		existingFlashcardCollection.visibility;

	// 	if (updateFlashcardCollectionDto.visibility) {
	// 		parsedVisibility = parseVisibilityFromString(
	// 			updateFlashcardCollectionDto.visibility,
	// 		);
	// 	}

	// 	existingFlashcardCollection.visibility =
	// 		parsedVisibility ?? existingFlashcardCollection.visibility;

	// 	await this.flashcardCollectionRepository.update(
	// 		id,
	// 		existingFlashcardCollection,
	// 	);

	// 	return existingFlashcardCollection;
	// }

	// async remove(id: string, userId: string): Promise<void> {
	// 	const flashcardCollection =
	// 		await this.flashcardCollectionRepository.findOne({
	// 			where: { id, owner: { id: userId } },
	// 		});

	// 	if (!flashcardCollection) {
	// 		throw new NotFoundException(
	// 			`FlashcardCollection with ID ${id} not found`,
	// 		);
	// 	}

	// 	await this.flashcardCollectionRepository.remove(flashcardCollection);
	// }

	async createFlashcard(
		userId: string,
		createFlashcardDto: CreateFlashcardsDto,
	) {
		const owner = await this.usersService.findById(userId);
		const flashcardCollection = await this.findById(
			createFlashcardDto.flashcardCollectionId,
			userId,
		);

		const createdFlashcards = await this.cardService.createMany(
			userId,
			createFlashcardDto,
			flashcardCollection,
		);

		const updatedCollection = await this.flashcardCollectionRepository.findOne({
			where: {
				id: createFlashcardDto.flashcardCollectionId,
				owner: { id: userId },
			},
			relations: ["flashcards", "owner"],
		});

		return updatedCollection;
	}

	async findFlashcards() {} // findFlashcards: Lida com a lógica de listagem de todos os Flashcards de um FlashcardCollection.

	private toSafeDto(
		flashcardCollection: FlashcardCollection,
	): FlashcardsCollectionSafeMissingFlashcardsDto {
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
