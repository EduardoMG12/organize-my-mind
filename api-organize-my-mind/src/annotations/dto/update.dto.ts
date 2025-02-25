import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAnnotationDto {
	@IsNotEmpty()
	@Expose()
	id: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	@Expose()
	title: string;

	@IsOptional()
	@IsString()
	@Expose()
	content?: string;

	@IsOptional()
	@IsString()
	@Expose()
	description?: string;
}
