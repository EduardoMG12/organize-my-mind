import { Expose } from "class-transformer";
import { Visibility } from "src/common/interfaces/visibility.interfaces";

export class AnnotationDto {
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

	@Expose()
	isActive: boolean;

	@Expose()
	created_at: Date;

	@Expose()
	updated_at: Date;

	@Expose()
	deleted_at: Date | null;
}
