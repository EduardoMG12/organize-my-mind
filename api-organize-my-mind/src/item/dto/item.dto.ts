import { Expose } from "class-transformer";
import { SafeUser } from "src/auth/dto/safeUser.dto";
import { ItemType } from "src/entities/item-types.entity";


export class ItemDto {
    @Expose()
    id: string;

    @Expose()
    owner: SafeUser;

    @Expose()
    type: ItemType;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    visibility: "PUBLIC" | "UNLISTED" | "PRIVATE";

    @Expose()
    position: number;

    @Expose()
    activy: boolean;
}
