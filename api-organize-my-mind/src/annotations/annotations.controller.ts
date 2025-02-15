import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';
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
import { GetUser } from 'src/decorators/get-user.decorator';
import { RequestWithUser } from 'src/common/interfaces/RequestWithUser';

@ApiTags('Annotations')
@Controller('annotations')
export class AnnotationsController {
    constructor(private readonly annotationsService: AnnotationsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new annotation' })
    @ApiBody({ type: CreateAnnotationDto })
    @ApiResponse({ status: 201, description: 'Annotation created', type: AnnotationDto })
    async create(@Body() annotationDto: CreateAnnotationDto, @Req() request: RequestWithUser): Promise<AnnotationDto> {
        const userId = request.user.id
        return toPlainToInstance(AnnotationDto, await this.annotationsService.create(annotationDto, userId));
    }

    @Get()
    @ApiOperation({ summary: 'Get all annotations for a user' })
    @ApiResponse({ status: 200, description: 'List of annotations', type: [AnnotationDto] })
    async findAll(@Req() request: RequestWithUser): Promise<AnnotationDto[]> {
        const userId = request.user.id
        return toPlainToInstance(AnnotationDto, await this.annotationsService.findAll(userId));
    }

    @Put("Order")
    @ApiOperation({ summary: 'Update the order of an annotation' })
    @ApiBody({ type: UpdateOrderDto })
    @ApiQuery({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'Updated list of annotations', type: [AnnotationDto] })
    async updateOrder(@Req() request: RequestWithUser, @Body() updateOrderDto: UpdateOrderDto): Promise<AnnotationDto[]> {
        const userId = request.user.id
        return toPlainToInstance(AnnotationDto, await this.annotationsService.updateOrder(updateOrderDto, userId));
    }

    @Put()
    @ApiOperation({ summary: 'Update an annotation' })
    @ApiBody({ type: UpdateAnnotationDto })
    @ApiQuery({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'Updated annotation', type: AnnotationDto })
    async update(@Body() annotationDto: UpdateAnnotationDto, @Req() request: RequestWithUser): Promise<AnnotationDto> {
        const userId = request.user.id
        return toPlainToInstance(AnnotationDto, await this.annotationsService.update(annotationDto, userId));
    }

    @Delete()
    @ApiOperation({ summary: 'Delete an annotation' })
    @ApiBody({ type: DeleteAnnotationDto })
    @ApiQuery({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'Annotation deleted' })
    async delete(@Body() deleteAnnotationDto: DeleteAnnotationDto, @Req() request: RequestWithUser): Promise<AnnotationDto> {
        const userId = request.user.id
        return toPlainToInstance(AnnotationDto, await this.annotationsService.delete(deleteAnnotationDto, userId));
    }// remember in future implement restore to delete
}
