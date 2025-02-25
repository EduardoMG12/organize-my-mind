import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class DeleteAnnotationDto {
	@IsNotEmpty()
	@Expose()
	id: string;
}
