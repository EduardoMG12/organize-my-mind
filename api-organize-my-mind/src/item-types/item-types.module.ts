import { Module } from '@nestjs/common';
import { ItemTypesController } from './item-types.controller';
import { ItemTypesService } from './item-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemType } from 'src/entities/item-types.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ItemType])],
  providers: [ItemTypesService],
  controllers: [ItemTypesController],
  exports: [ItemTypesService],
})
export class ItemTypesModule {}
