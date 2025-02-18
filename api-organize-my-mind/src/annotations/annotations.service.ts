import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from 'src/entities/annotation.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateAnnotationDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/execeptions/user.exception';
import { SafeUser } from 'src/auth/dto/safeUser.dto';
import { UsersService } from 'src/users/users.service';
import { ItemService } from 'src/item/item.service';
import { TitleRequiredException } from 'src/execeptions/item.exception';
import { ItemTypeName } from 'src/entities/ENUM/item-type-name.enum';

@Injectable()
export class AnnotationsService {
    constructor(
        @InjectRepository(Annotation)
        private annotationsRepository: Repository<Annotation>,
        private usersService: UsersService,
        private itemService: ItemService
    ) { }

    private validateUser(user: User | SafeUser): void {
        if (!user) throw new UserNotFoundException();
    }

    private validateTitle(title: string): void {
        if (!title) throw new TitleRequiredException;
    }

    // private async findUserAnnotation(id: number, userId: number): Promise<Annotation> {
    //     const annotation = await this.annotationsRepository.findOne({ where: { id, owner: { id: userId } } });
    //     if (!annotation) throw new NotFoundException("Annotation not found");
    //     return annotation;
    // }


    async create(annotationDto: CreateAnnotationDto, userId:string): Promise<Annotation> {
        const owner = await this.usersService.findById(userId);
        this.validateUser(owner);
        const type =  ItemTypeName.ANNOTATION

        const { title, content, description } = annotationDto;
        this.validateTitle(title);

        await this.itemService.create({title, description, type}, owner.id)
        
        const item = await this.itemService.create({ title, description, type}, userId);

        const newAnnotation = this.annotationsRepository.create({
            item,
            content
        });

        return await this.annotationsRepository.save(newAnnotation); 
    }

    async findAll(userId: string): Promise<Annotation[]> {
        const userFetch = await this.usersService.findById(userId);
        this.validateUser(userFetch);
    
        return this.annotationsRepository.find({
            where: { item: { owner: { id: userId, deleted_at: IsNull() } } },
            
        });
    }
    

//     async updateOrder(updateOrderDto: UpdateOrderDto, userId: number): Promise<Annotation[]> {
//         const userFetch = await this.usersService.findById(userId);
//         this.validateUser(userFetch)

//         const { id, newPosition } = updateOrderDto

//         const annotationToMove = await this.findUserAnnotation(id, userId);

//         if (annotationToMove.position === newPosition) {
//             throw new BadRequestException("You don't move annotation here")
//         }

//         const allAnnotations = await this.annotationsRepository.find({
//             where: { owner: { id: userFetch.id } },
//             order: { position: "ASC" }
//         })


//         const filteredAnnotations = allAnnotations.filter(a => a.id !== id)

//         filteredAnnotations.splice(newPosition, 0, annotationToMove)

//         const updateAnnotations = filteredAnnotations.map((annotation, index) => ({
//             ...annotation,
//             position: index
//         }))

//         return this.annotationsRepository.save(updateAnnotations).then((savedAnnotations) => savedAnnotations.sort((a, b) => a.position - b.position))

//     }

//     async update(updateAnnotationDto: UpdateAnnotationDto, userId: number): Promise<AnnotationDto> {
//         const userFetch = await this.usersService.findById(userId)

//         this.validateUser(userFetch);

//         const { id, title, content } = updateAnnotationDto;

//         const annotation = await this.findUserAnnotation(id, userId)

//         if (!annotation) {
//             throw new BadRequestException("Annotation not found")
//         }

//         annotation.title = title ?? annotation.title
//         annotation.content = content ?? annotation.content

//         return this.annotationsRepository.save(annotation)
//     }

//     async findAll(userId: number): Promise<Annotation[]> {
//         const userFetch = await this.usersService.findById(userId);
//         this.validateUser(userFetch)

//         return this.annotationsRepository.findBy({ owner: { id: userId }, deleted_at: IsNull() });
//     }

//     async findAnnotationsToDelete(dateDelete: Date): Promise<Annotation[]> {
//         return this.annotationsRepository.find({ where: { deleted_at: LessThan(dateDelete) } })
//     }

//     async delete(deleteDto: DeleteAnnotationDto, userId: number): Promise<Annotation> {
//         const annotation = await this.findUserAnnotation(deleteDto.id, userId)

//         if (!annotation) {
//             throw new AnnotationNotFoundException()
//         }

//         if (annotation.deleted_at === null) {
//             annotation.deleted_at = new Date();
//             return this.annotationsRepository.save(annotation);
//         } else {
//             return this.annotationsRepository.remove(annotation);
//         }
//     }

//     async deletePermanently(annotations: Annotation[]): Promise<number> {
//         const result = await this.annotationsRepository.remove(annotations);
//         return result.length || 0;
//     }
}
