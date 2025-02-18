import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotationsService } from './annotations.service';
import { Annotation } from 'src/entities/annotation.entity';
import { AnnotationsController } from './annotations.controller';
import { UsersModule } from 'src/users/users.module';
import { ItemModule } from 'src/item/item.module';

@Module({
    imports: [TypeOrmModule.forFeature([Annotation]), UsersModule, ItemModule],
    providers: [AnnotationsService],
    controllers: [AnnotationsController],
    exports: [AnnotationsService],
})
export class AnnotationsModule { }
