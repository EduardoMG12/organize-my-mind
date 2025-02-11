import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';
import { UpdateAnnotationDto } from './dto/update.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { AnnotationDto } from './dto/annotation.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteAnnotationDto } from './dto/delete.dto';
import { UserAnnotationDto } from './dto/user.dto';

@ApiTags('Annotations')
@Controller('annotations')
// @UseGuards(AuthGuard)
export class AnnotationsController {
    constructor(private readonly annotationsService: AnnotationsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new annotation' })
    @ApiBody({ type: CreateAnnotationDto })
    @ApiResponse({ status: 201, description: 'Annotation created', type: AnnotationDto })
    async create(@Body() annotationDto: CreateAnnotationDto): Promise<AnnotationDto> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.create(annotationDto));
    }

    @Get()
    @ApiOperation({ summary: 'Get all annotations for a user' })
    @ApiQuery({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'List of annotations', type: [AnnotationDto] })
    async findAll(@Query() user: UserAnnotationDto): Promise<AnnotationDto[]> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.findAll(user));
    }

    @Put("Order")
    @ApiOperation({ summary: 'Update the order of an annotation' })
    @ApiBody({ type: UpdateOrderDto })
    @ApiQuery({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'Updated list of annotations', type: [AnnotationDto] })
    async updateOrder(@Query() user: UserAnnotationDto, @Body() updateOrderDto: UpdateOrderDto): Promise<AnnotationDto[]> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.updateOrder(updateOrderDto, user));
    }

    @Put()
    @ApiOperation({ summary: 'Update an annotation' })
    @ApiBody({ type: UpdateAnnotationDto })
    @ApiQuery({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'Updated annotation', type: AnnotationDto })
    async update(@Body() annotationDto: UpdateAnnotationDto, @Query() user: UserAnnotationDto): Promise<AnnotationDto> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.update(annotationDto, user));
    }

    @Delete()
    @ApiOperation({ summary: 'Delete an annotation' })
    @ApiBody({ type: DeleteAnnotationDto })
    @ApiQuery({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'Annotation deleted' })
    async delete(@Body() deleteAnnotationDto: DeleteAnnotationDto, @Query() user: UserAnnotationDto): Promise<AnnotationDto> {
        console.log(deleteAnnotationDto)
        return toPlainToInstance(AnnotationDto, await this.annotationsService.delete(deleteAnnotationDto, user));
    }
}
