import { Controller, Post, Body, BadRequestException, Put } from '@nestjs/common';
import { ItemTypesService } from '../item-types/item-types.service';
import { ItemService } from './item.service';
import { CreateItem } from './dto/createItem.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { Item } from 'src/entities/item.entity';
import { UpdateOrder } from './dto/updateOrder.dto';
import { ItemTypeDto } from 'src/item-types/dto/itemType.dto';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemService,
    private readonly itemTypesService: ItemTypesService,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItem, userId: string): Promise<Item> {
    const itemType = await this.itemTypesService.findByName(createItemDto.type);

    if (!itemType) {
      throw new BadRequestException(`ItemType '${createItemDto.type}' is invalid.`);
    }

    return toPlainToInstance(Item , this.itemsService.create(createItemDto, userId)); // i don't know if this right, cause maybe itemType don't be inject
  }

  @Put()
  async updateOrder(@Body() updateOrder: UpdateOrder, userId: string, itemType: ItemTypeDto): Promise<Item[]>{
    return toPlainToInstance(Item, await this.itemsService.updateOrder(updateOrder, userId, itemType))
  }
}
