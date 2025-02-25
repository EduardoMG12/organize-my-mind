import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateOrderDto {
	@IsNotEmpty()
	@Expose()
	id: string;

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	newPosition: number;
}
