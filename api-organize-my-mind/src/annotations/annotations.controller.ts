import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';
import { UpdateAnnotationDto } from './dto/update.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { findAllAnnotationDto } from './dto/findAll.dto';
import { AnnotationDto } from './dto/annotation.dto';

@Controller('annotations')
// @UseGuards(AuthGuard)
export class AnnotationsController {
    constructor(private readonly annotationsService: AnnotationsService) { }

    @Post()
    async create(@Body() annotationDto: CreateAnnotationDto): Promise<AnnotationDto> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.create(annotationDto));
    }

    @Get()
    async findAll(@Query() user: findAllAnnotationDto): Promise<AnnotationDto[]> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.findAll(user));
    }

    @Put("Order")
    async updateOrder(@Body() updateOrderDto: UpdateOrderDto, @Query("user") user: User): Promise<AnnotationDto[]> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.updateOrder(updateOrderDto, user));
    }

    @Put()
    async update(@Body() annotationDto: UpdateAnnotationDto, @Query("user") user: User): Promise<AnnotationDto> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.update(annotationDto, user));
    }

    @Delete()
    async delete(id: number, @Query("user") user: User) {
        toPlainToInstance(AnnotationDto, await this.annotationsService.delete(id, user));
    }



}
