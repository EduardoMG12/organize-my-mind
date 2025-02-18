import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";
import { ItemTypeName } from "./ItemTypeName.enum";

export class ItemTypeDto {
    @Expose()
    id: string;

    @IsEnum(ItemTypeName, { message: "Invalid item type." })
    @Expose()
    name: ItemTypeName;
}

