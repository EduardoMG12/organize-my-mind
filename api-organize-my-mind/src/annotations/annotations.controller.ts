import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create.dto';
import { toPlainToInstance } from 'src/utils/toPlainToInstance';
import { AnnotationSafeDto } from './dto/annotationSafe.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/decorators/getUserId';
import { UpdateAnnotationDto } from './dto/update.dto';
import { DeleteAnnotationDto } from './dto/delete.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AnnotationDto } from './dto/annotation.dto';

@ApiTags('Annotations')
@Controller('annotations')
export class AnnotationsController {
    constructor(private readonly annotationsService: AnnotationsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new annotation' })
    @ApiBody({ type: CreateAnnotationDto })
    @ApiResponse({ status: 201, description: 'Annotation created', type: AnnotationSafeDto })
    async create(@Body() annotationDto: CreateAnnotationDto, @GetUserId() userId: string): Promise<AnnotationSafeDto> {
        console.log(userId)
        return toPlainToInstance(AnnotationSafeDto, await this.annotationsService.create(annotationDto, userId));
    }

    @Get()
    @ApiOperation({ summary: 'Get all annotations for a user' })
    @ApiResponse({ status: 200, description: 'List of annotations', type: [AnnotationSafeDto] })
    async findAll(@GetUserId() userId: string): Promise<AnnotationSafeDto[]> {
        return toPlainToInstance(AnnotationSafeDto, await this.annotationsService.findAll(userId));
    }

    @Get("Deleted")
    @ApiOperation({ summary: 'Get all deleted annotations for a user' })
    @ApiResponse({ status: 200, description: 'List of deleted annotations', type: [AnnotationSafeDto] })
    async findAllDeleted(@GetUserId() userId: string): Promise<AnnotationDto[]> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.findAllDeleted(userId));
    }

    @Put("Order")
    @ApiOperation({ summary: 'Update the order of an annotation' })
    @ApiBody({ type: UpdateOrderDto })
    @ApiQuery({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'Updated list of annotations', type: [AnnotationSafeDto] })
    async updateOrder(@GetUserId() userId: string, @Body() updateOrderDto: UpdateOrderDto): Promise<AnnotationSafeDto[]> {
        return toPlainToInstance(AnnotationSafeDto, await this.annotationsService.updateOrder(updateOrderDto, userId));
    }

    @Put()
    @ApiOperation({ summary: 'Update an annotation' })
    @ApiBody({ type: UpdateAnnotationDto })
    @ApiQuery({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'Updated annotation', type: AnnotationSafeDto })
    async update(@Body() annotationDto: UpdateAnnotationDto, @GetUserId() userId: string): Promise<AnnotationSafeDto> {
        return toPlainToInstance(AnnotationSafeDto, await this.annotationsService.update(annotationDto, userId));
    }

    @Delete()
    @ApiOperation({ summary: 'Delete an annotation' })
    @ApiBody({ type: DeleteAnnotationDto })
    @ApiQuery({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'Annotation deleted' })
    async delete(@Body() deleteAnnotationDto: DeleteAnnotationDto, @GetUserId() userId: string): Promise<AnnotationDto> {
        return toPlainToInstance(AnnotationDto, await this.annotationsService.delete(deleteAnnotationDto, userId));
    }

    @Put('toogle-activity')
    @ApiOperation({ summary: 'Toggle activity an annotation' })
    @ApiBody({ type: DeleteAnnotationDto })
    @ApiQuery({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'Annotation toggle activity' })
    async updateToogleAnnotationActivity(@Body() deleteAnnotationDto: DeleteAnnotationDto, @GetUserId() userId: string): Promise<AnnotationSafeDto> {
        return toPlainToInstance(AnnotationSafeDto, await this.annotationsService.toogleAnnotationActivity(deleteAnnotationDto, userId));
    }

    @Put('restore')
    @ApiOperation({ summary: 'Restore a soft-deleted annotation' })
    @ApiBody({ type: DeleteAnnotationDto })
    @ApiResponse({ status: 200, description: 'Annotation restored', type: AnnotationSafeDto })
    async restore(@Body() restoreDto: DeleteAnnotationDto, @GetUserId() userId: string): Promise<AnnotationSafeDto> {
        return toPlainToInstance(AnnotationSafeDto, await this.annotationsService.restore(restoreDto, userId));
    }
}
