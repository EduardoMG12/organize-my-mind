import { UpdateAnnotationDto } from './dto/update.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from 'src/entities/annotation.entity';
import { Repository } from 'typeorm';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/execeptions/user.exception';
import { AnnotationNotFoundException, TitleRequiredException } from 'src/execeptions/annotation.exception';
import { SafeUser } from 'src/auth/dto/safeUser.dto';
import { UsersService } from 'src/users/users.service';
import { findAllAnnotationDto } from './dto/findAll.dto';
import { AnnotationDto } from './dto/annotation.dto';

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

    private async findUserAnnotation(id: number, userId: number): Promise<Annotation> {
        const annotation = await this.annotationsRepository.findOne({ where: { id, user: { id: userId } } });
        if (!annotation) throw new NotFoundException("Annotation not found");
        return annotation;
    }


    async create(annotationDto: CreateAnnotationDto): Promise<Annotation> {
        const user = await this.usersService.findById(annotationDto.userId);

        this.validateUser(user);

        const { title, content } = annotationDto;

        this.validateTitle(title);

        const annotation = await this.annotationsRepository.findOne({
            where: { user: { id: user.id } }, // Busca pela anotação do usuário, usando o ID
            order: { position: "DESC" },
        });

        if (annotation) {
            await this.annotationsRepository.increment(
                { id: annotation.id },
                "position",
                1
            );
        }

        await this.annotationsRepository.increment({ user: { id: user.id } }, "position", 1);

        const newAnnotation = this.annotationsRepository.create({
            user,
            title,
            content,
            position: 0
        });

        const savedAnnotation = await this.annotationsRepository.save(newAnnotation);

        return savedAnnotation;
    }

    async updateOrder(updateOrderDto: UpdateOrderDto, user: findAllAnnotationDto): Promise<Annotation[]> {
        const userFetch = await this.usersService.findById(user.userId); // remove password with this return
        this.validateUser(userFetch)

        const { id, newPosition } = updateOrderDto

        const annotationToMove = await this.findUserAnnotation(id, userFetch.id);

        if (annotationToMove.position === newPosition) {
            throw new BadRequestException("You don't move annotation here")
        }

        const allAnnotations = await this.annotationsRepository.find({
            where: { user: { id: userFetch.id } },
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

    async update(updateAnnotationDto: UpdateAnnotationDto, user: User): Promise<AnnotationDto> {
        this.validateUser(user);

        const { id, title, content } = updateAnnotationDto;

        const annotation = await this.findUserAnnotation(id, user.id)

        if (!annotation) {
            throw new Error("Annotation not found")
        }

        annotation.title = title ?? annotation.title
        annotation.content = content ?? annotation.content

        return this.annotationsRepository.save(annotation)
    }

    async findAll(user: findAllAnnotationDto): Promise<Annotation[]> {
        const userFetch = await this.usersService.findById(user.userId);
        this.validateUser(userFetch)

        return this.annotationsRepository.findBy({ user: { id: user.userId } });
    }

    async delete(id: number, user: User): Promise<Annotation> {

        const annotation = await this.findUserAnnotation(id, user.id)

        if (!annotation) {
            throw new AnnotationNotFoundException()
        }

        return this.annotationsRepository.remove(annotation)
    }
}
