import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';
import { Annotation } from 'src/entities/annotation.entity';
import { UpdateAnnotationDto } from './dto/update.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('annotations')
// @UseGuards(AuthGuard)
export class AnnotationsController {
    constructor(private readonly annotationsService: AnnotationsService) { }

    @Post()
    async create(@Body() annotationDto: CreateAnnotationDto,
        @Query("user") user: User): Promise<Annotation> {
        return this.annotationsService.create(annotationDto, user);
    }

    @Get()
    async findAll(@Query("user") user: User): Promise<Annotation[]> {
        return this.annotationsService.findAll(user);
    }

    @Put("Order")
    async updateOrder(@Body() updateOrderDto: UpdateOrderDto, @Query("üser") user: User) {
        return this.annotationsService.updateOrder(updateOrderDto, user)
    }

    @Put()
    async update(@Body() annotationDto: UpdateAnnotationDto, @Query("user") user: User): Promise<Annotation> {
        return this.annotationsService.update(annotationDto, user);
    }

    @Delete()
    async delete(id: number, @Query("user") user: User) {
        this.annotationsService.delete(id, user);
    }



}
