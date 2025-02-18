import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { ItemService } from './item.service';
import { ItemsController } from './item.controller';
import { UsersModule } from 'src/users/users.module';
import { ItemTypesModule } from 'src/item-types/item-types.module';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), ItemTypesModule, UsersModule],
    providers: [ItemService],
    controllers: [ItemsController],
    exports: [ItemService]

})
export class ItemModule {}
