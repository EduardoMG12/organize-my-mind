import { Expose } from "class-transformer";

export enum Visibility {
	PUBLIC = "public",
	PRIVATE = "private",
	FRIENDS_ONLY = "friends_only",
}

export class AnnotationSafeDto {
	@Expose()
	id: string;

	@Expose()
	title: string;

	@Expose()
	content: string;

	@Expose()
	description: string;

	@Expose()
	visibility: Visibility;

	@Expose()
	position: number;
}
