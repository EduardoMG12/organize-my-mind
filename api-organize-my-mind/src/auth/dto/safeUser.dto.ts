import { Expose } from "class-transformer";

export class SafeUser {
	@Expose()
	id: string;

	@Expose()
	username: string;

	@Expose()
	fullName: string;

	@Expose()
	email: string;

	@Expose()
	isPublic: boolean;

	@Expose()
	bio: string;

	@Expose()
	created_at: Date;
}
