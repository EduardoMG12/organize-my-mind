import { Expose } from "class-transformer";
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateCardDto {
	@IsString()
	@Expose()
	front: string;

	@IsString()
	@Expose()
	back: string;

	@IsOptional()
	@IsString()
	@Expose()
	description?: string;
}

export class CardSafeDto extends CreateCardDto {
	@IsString()
	@IsUUID()
	@Expose()
	id: string;

	@IsInt()
	@Expose()
	position: number;

	@IsOptional()
	@IsString()
	@Expose()
	description?: string;
}
