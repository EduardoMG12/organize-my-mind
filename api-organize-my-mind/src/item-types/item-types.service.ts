import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemTypeName } from 'src/entities/ENUM/item-type-name.enum';
import { ItemType } from 'src/entities/item-types.entity';
import { ItemTypeDto} from './dto/itemType.dto';
import { Repository } from 'typeorm';
import { ItemTypeNotFoundException } from 'src/execeptions/item.exception';

@Injectable()
export class ItemTypesService {
    constructor(
        @InjectRepository(ItemType)
        private itemTypeRepository: Repository<ItemType>
    ){}

    async create(name: ItemTypeName): Promise<ItemTypeDto> {
            const itemType = this.itemTypeRepository.create({name})
            return this.itemTypeRepository.save(itemType)
    }

    async findByName(type: ItemTypeName): Promise<ItemType> {
        const itemType= await this.itemTypeRepository.findOne({ where: { name: type } })
        if(!itemType)throw new ItemTypeNotFoundException()

        return itemType;
    }

}

