import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAnnotationDto {
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
