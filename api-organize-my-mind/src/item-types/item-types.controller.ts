import { Body, Controller, Post } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { ItemTypesService } from './item-types.service';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { ItemTypeDto } from './dto/itemType.dto';
import { FindByNameDto } from './dto/find-by-name.dto';

@Controller('item-types')
export class ItemTypesController {
    constructor(private readonly itemTypesService: ItemTypesService) {}

    @Post()
    async create(@Body() createItemTypeDto: CreateItemTypeDto): Promise<ItemTypeDto> {
        return toPlainToInstance(ItemTypeDto, await this.itemTypesService.create(createItemTypeDto.name))
    }

    @Post()
    async findByType(findByNameDto:FindByNameDto): Promise<ItemTypeDto> {
        return toPlainToInstance(ItemTypeDto, await this.itemTypesService.findByName(findByNameDto.type))
    }
}
