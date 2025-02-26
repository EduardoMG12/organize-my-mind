import { Expose, Type } from "class-transformer";
import {
	IsNotEmpty,
	IsUUID,
	ValidateNested,
	ArrayNotEmpty,
} from "class-validator";
import { CreateCardDto } from "./create-card.dto"; // 👈 Importe CreateFlashcardDto

export class CreateFlashcardsDto {
	@IsNotEmpty()
	@IsUUID()
	@Expose()
	flashcardCollectionId: string;

	@IsNotEmpty()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => CreateCardDto)
	@Expose()
	flashcards: CreateCardDto[];
}
