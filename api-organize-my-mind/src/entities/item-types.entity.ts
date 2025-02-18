import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemTypeName } from "./ENUM/item-type-name.enum";

@Entity("item_types")
export class ItemType {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type:"enum",
        enum: ItemTypeName,
        unique: true })
    name: ItemTypeName;
}
