import { Expose, Type } from "class-transformer";

import {
	ArrayNotEmpty,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from "class-validator";
import { SafeUser } from "src/auth/dto/safeUser.dto";
import { Visibility } from "src/common/interfaces/visibility.interfaces";
import { CardSafeDto } from "src/card/dto/create-card.dto";

export class FlashcardsCollectionSafeMissingFlashcardsDto {
	@IsUUID()
	@Expose()
	id: string;

	@IsString()
	@Expose()
	title: string;

	@IsOptional()
	@IsString()
	@Expose()
	description?: string;

	@IsEnum(Visibility)
	@Expose()
	visibility?: Visibility;

	@IsNumber()
	@Expose()
	position: number;

	@IsBoolean()
	@Expose()
	isActive: boolean;

	@Expose()
	created_at: Date;

	@Expose()
	updated_at: Date;
}

export class FlashcardCollectionWithOwnerDto extends FlashcardsCollectionSafeMissingFlashcardsDto {
	@Expose()
	owner: SafeUser;
}
export class FlashcardCollectionSafeDto extends FlashcardCollectionWithOwnerDto {
	@IsNotEmpty()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => CardSafeDto)
	@Expose()
	flashcards: CardSafeDto[];
}
