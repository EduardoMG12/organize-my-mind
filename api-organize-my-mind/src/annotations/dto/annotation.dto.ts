import { Expose } from "class-transformer";
import { ItemDto } from "src/item/dto/item.dto";

export class AnnotationDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    content: string;
    
    @Expose()
    item: ItemDto;

}
