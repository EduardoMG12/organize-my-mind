import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class BaseUser {
	@ApiProperty({
		example: "john.smith@example.com",
		description: "User email address",
	})
	@IsEmail()
	@Expose()
	email: string;
}
