import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from 'src/entities/annotation.entity';
import { IsNull, LessThan, Repository } from 'typeorm';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/execeptions/user.exception';
import { SafeUser } from 'src/auth/dto/safeUser.dto';
import { UsersService } from 'src/users/users.service';
import { AnnotationNotFoundException, TitleRequiredException } from 'src/execeptions/annotations.exception';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateAnnotationDto } from './dto/update.dto';
import { AnnotationSafeDto } from './dto/annotationSafe.dto';
import { DeleteAnnotationDto } from './dto/delete.dto';

@Injectable()
export class AnnotationsService {
    constructor(
        @InjectRepository(Annotation)
        private annotationsRepository: Repository<Annotation>,
        private usersService: UsersService,
    ) { }

    private validateUser(user: User | SafeUser): void {
        if (!user) throw new UserNotFoundException();
    }

    private validateTitle(title: string): void {
        if (!title) throw new TitleRequiredException;
    }

    private async findUserAnnotation(id: string, userId: string): Promise<Annotation> {
        const annotation = await this.annotationsRepository.findOne({ where: { id, owner: { id: userId } } });
        if (!annotation) throw new NotFoundException("Annotation not found");
        return annotation;
    }


    async create(annotationDto: CreateAnnotationDto, userId:string): Promise<AnnotationSafeDto> {
        const owner = await this.usersService.findById(userId);
        this.validateUser(owner);
        const { title, content, description } = annotationDto;

        this.validateTitle(title);

        const annotation = await this.annotationsRepository.findOne({
            where: { owner: { id: owner.id } },
            order: { position: "DESC" },
        });

        if (annotation) {
            await this.annotationsRepository.increment(
                { id: annotation.id },
                "position",
                1
            );
        }

        const newAnnotation = this.annotationsRepository.create({
            owner,
            title,
            content,
            description,
            position: 0
        });


        return await this.annotationsRepository.save(newAnnotation); 
    }

    async findAll(userId: string): Promise<Annotation[]> {
        const userFetch = await this.usersService.findById(userId);
        this.validateUser(userFetch);
    
        return this.annotationsRepository.find({
            where: { owner: { id: userId, deleted_at: IsNull() } },
             order: { position: "ASC" },
        });
    }
    

    async updateOrder(updateOrderDto: UpdateOrderDto, userId: string): Promise<Annotation[]> {
        const userFetch = await this.usersService.findById(userId);
        this.validateUser(userFetch)

        const { id, newPosition } = updateOrderDto

        const annotationToMove = await this.findUserAnnotation(id, userId);

        if (annotationToMove.position === newPosition) {
            throw new BadRequestException("You don't move annotation here")
        }

        const allAnnotations = await this.annotationsRepository.find({
            where: { owner: { id: userFetch.id } },
            order: { position: "ASC" }
        })


        const filteredAnnotations = allAnnotations.filter(a => a.id !== id)

        filteredAnnotations.splice(newPosition, 0, annotationToMove)

        const updateAnnotations = filteredAnnotations.map((annotation, index) => ({
            ...annotation,
            position: index
        }))

        return this.annotationsRepository.save(updateAnnotations).then((savedAnnotations) => savedAnnotations.sort((a, b) => a.position - b.position))

    }

    async update(updateAnnotationDto: UpdateAnnotationDto, userId: string): Promise<AnnotationSafeDto> {
        const userFetch = await this.usersService.findById(userId)

        this.validateUser(userFetch);

        const { id, title, content, description } = updateAnnotationDto;

        const annotation = await this.findUserAnnotation(id, userId)

        if (!annotation) {
            throw new BadRequestException("Annotation not found")
        }

        annotation.title = title ?? annotation.title
        annotation.content = content ?? annotation.content
        annotation.description = description ?? annotation.description

        return this.annotationsRepository.save(annotation)
    }


    async findAnnotationsToDelete(dateDelete: Date): Promise<Annotation[]> {
        return this.annotationsRepository.find({ where: { deleted_at: LessThan(dateDelete) } })
    }

    async delete(deleteDto: DeleteAnnotationDto, userId: string): Promise<AnnotationSafeDto> {
        const annotation = await this.findUserAnnotation(deleteDto.id, userId)

        if (!annotation) {
            throw new AnnotationNotFoundException()
        }

        if (annotation.deleted_at === null) {
            annotation.deleted_at = new Date();
            return this.annotationsRepository.save(annotation);
        } else {
            return this.annotationsRepository.remove(annotation);
        }
    }

    async deletePermanently(annotations: Annotation[]): Promise<number> {
        const result = await this.annotationsRepository.remove(annotations);
        return result.length || 0;
    }

    async restore(deleteDto: DeleteAnnotationDto, userId: string): Promise<AnnotationSafeDto> {
        const annotation = await this.findUserAnnotation(deleteDto.id, userId);
    
        if (!annotation.deleted_at) {
            throw new AnnotationNotFoundException();
        }
    
        annotation.deleted_at = null;
        annotation.activy = true;
        
        return this.annotationsRepository.save(annotation);
    }
}
