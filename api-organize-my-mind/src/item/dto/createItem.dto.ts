import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";
import { ItemTypeName } from "src/item-types/dto/ItemTypeName.enum";


export class CreateItem {
    @Expose()
    title: string;

    @Expose()
    description?: string;

    @Expose()
    @IsEnum(ItemTypeName, { message: "Invalid item type." })
    type:ItemTypeName
}
