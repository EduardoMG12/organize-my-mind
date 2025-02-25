import { Expose } from "class-transformer";
import {
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class CreateFlashcardDto {
	@Expose()
	id: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	title: string;

	@IsString()
	@Expose()
	front: string;

	@IsString()
	@Expose()
	back: string;

	@IsInt()
	@Expose()
	position: number;

	@IsBoolean()
	@Expose()
	isActive: boolean;

	@IsOptional()
	@IsString()
	@Expose()
	description?: string;
}
