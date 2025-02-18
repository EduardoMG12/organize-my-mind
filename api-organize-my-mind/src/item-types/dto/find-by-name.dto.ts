import { Expose } from "class-transformer";
import { ItemTypeName } from "./ItemTypeName.enum";
import { IsEnum } from "class-validator";

export class FindByNameDto{
    @Expose()
    @IsEnum(ItemTypeName, { message: "Invalid item type." })
    type:ItemTypeName
}