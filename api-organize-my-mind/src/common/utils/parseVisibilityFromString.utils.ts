import { BadRequestException } from "@nestjs/common";
import { Visibility } from "../interfaces/visibility.interfaces";

export function parseVisibilityFromString(
	visibilityString: string | undefined,
): Visibility | undefined {
	if (!visibilityString) {
		return undefined;
	}

	const upperVisibilityString = visibilityString.toUpperCase();

	if (Object.values(Visibility).includes(upperVisibilityString as Visibility)) {
		return upperVisibilityString as Visibility;
	}
	throw new BadRequestException(
		`Valor de visibility inválido: "${visibilityString}". Valores permitidos são: ${Object.values(Visibility).join(", ")}`,
	);
}
