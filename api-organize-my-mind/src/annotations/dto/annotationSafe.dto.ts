import { Expose } from "class-transformer";
import { Visibility } from "src/common/interfaces/visibility.interfaces";

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
