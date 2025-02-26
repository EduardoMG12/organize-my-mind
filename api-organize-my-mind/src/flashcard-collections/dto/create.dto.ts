import { Expose } from "class-transformer";
import { IsString, IsOptional, IsEnum } from "class-validator";
import { Visibility } from "src/common/interfaces/visibility.interfaces";

export class CreateFlashcardCollectionDto {
	@IsString()
	@Expose()
	title: string;

	@IsOptional()
	@IsString()
	@Expose()
	description?: string;

	@IsOptional()
	@IsEnum(Visibility)
	@Expose()
	visibility?: Visibility;
}
