import { UpdateAnnotationDto } from './dto/update.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from 'src/entities/annotation.entity';
import { Repository } from 'typeorm';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AnnotationsService {
    constructor(
        @InjectRepository(Annotation)
        private annotationsRepository: Repository<Annotation>,
    ) { }

    private validateUser(user: User): void {
        if (!user) throw new NotFoundException("User not found");
    }

    private validateTitle(title: string): void {
        if (!title) throw new NotFoundException("Title is required");
    }

    private async findUserAnnotation(id: number, user: User): Promise<Annotation> {
        const annotation = await this.annotationsRepository.findOne({ where: { id, user } });
        if (!annotation) throw new NotFoundException("Annotation not found");
        return annotation;
    }


    async create(annotationDto: CreateAnnotationDto, user: User): Promise<Annotation> {
        this.validateUser(user);

        const { title, content } = annotationDto

        this.validateTitle(title)

        await this.annotationsRepository.increment({ user }, "position", 1)

        const newAnnotation = this.annotationsRepository.create({ user, title, content, position: 0 })

        return this.annotationsRepository.save(newAnnotation);
    }

    async updateOrder(updateOrderDto: UpdateOrderDto, user: User): Promise<Annotation[]> {
        this.validateUser(user)

        const { id, newPosition } = updateOrderDto

        const annotationToMove = await this.findUserAnnotation(id, user);

        if (annotationToMove.position === newPosition) {
            throw new Error("You don't move annotation here")
        }

        const allAnnotations = await this.annotationsRepository.find({
            where: { user },
            order: { position: "ASC" }
        })

        const filteredAnnotations = allAnnotations.filter(a => a.id !== id)

        filteredAnnotations.splice(newPosition, 0, annotationToMove)

        const updateAnnotations = filteredAnnotations.map((annotation, index) => ({
            ...annotation,
            position: index
        }))

        return this.annotationsRepository.save(updateAnnotations)

    }

    async update(updateAnnotationDto: UpdateAnnotationDto, user: User): Promise<Annotation> {
        this.validateUser(user);

        const { id, title, content } = updateAnnotationDto;

        const annotation = await this.findUserAnnotation(id, user)

        if (!annotation) {
            throw new Error("Annotation not found")
        }

        annotation.title = title ?? annotation.title
        annotation.content = content ?? annotation.content

        return this.annotationsRepository.save(annotation)
    }

    async findAll(user: User): Promise<Annotation[]> {
        this.validateUser(user)

        return this.annotationsRepository.findBy({ user });
    }

    async delete(id: number, user: User): Promise<Annotation> {

        const annotation = await this.findUserAnnotation(id, user)

        if (!annotation) {
            throw new Error("Annotation not found")
        }

        return this.annotationsRepository.remove(annotation)
    }
}
