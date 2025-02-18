import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItem } from './dto/createItem.dto';
import { ItemType } from 'src/entities/item-types.entity';
import { UsersService } from 'src/users/users.service';
import { UserNotFoundException } from 'src/execeptions/user.exception';
import { UpdateOrder } from './dto/updateOrder.dto';
import { CannotMoveItemException, ItemNotFoundException } from 'src/execeptions/item.exception';
import { ItemTypesService } from 'src/item-types/item-types.service';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepository: Repository<Item>,
        private readonly usersService: UsersService,
        private readonly itemsTypeService: ItemTypesService
    ){}
    
    async create(createItemDto: CreateItem, userId: string): Promise<Item>{
        const user = await this.usersService.findById(userId)

        const type = await this.itemsTypeService.findByName(createItemDto.type)

        const newItem = this.itemsRepository.create({
            title:createItemDto.title,
            description: createItemDto.description,
            type: type,
            owner: user
        })

        return this.itemsRepository.save(newItem);
    }

    async updateOrder(updateOrderDto:UpdateOrder, userId:string, itemType:ItemType): Promise<Item[]> {
        const user = await this.usersService.findById(userId) 

        const {id, newPosition} = updateOrderDto;

        const itemToMove = await this.itemsRepository.findOne({
            where: {id, owner: { id: user.id}, type: itemType}
        })

        if(!itemToMove) throw new ItemNotFoundException()

        if(itemToMove?.position === newPosition) throw new CannotMoveItemException()

        const allItems = await this.itemsRepository.find({
            where: { owner: { id: user.id},
            type: itemType}, order: {position: "ASC"}
        })

        const filteredItems = allItems.filter(i => i.id !== id)

        filteredItems.splice(newPosition, 0, itemToMove)

        const updatedItems = filteredItems.map((item, index) => ({
            ...item,
            position:index
        }))

        return this.itemsRepository.save(updatedItems).then(savedItems => savedItems.sort((a, b) => a.position - b.position))
    }

    async incrementPosition(ownerId: string): Promise<void> {
        await this.itemsRepository.increment(
            { owner: { id: ownerId } }, 
            "position", 
            1
        );
    }
}
