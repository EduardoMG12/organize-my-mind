
import { IsEnum } from 'class-validator';
import { ItemTypeName } from './ItemTypeName.enum';
import { Expose } from 'class-transformer';


export class CreateItemTypeDto {
    @IsEnum(ItemTypeName, { message: "Invalid item type." })
    @Expose()
    name: ItemTypeName;
}
