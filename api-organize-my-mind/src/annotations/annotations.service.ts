import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Annotation } from "src/entities/annotation.entity";
import { IsNull, LessThan, Not, Repository } from "typeorm";
import type { UsersService } from "src/users/users.service";
import {
	AnnotationNotFoundException,
	RestoreAnnotationNotFoundException,
	TitleRequiredException,
} from "src/execeptions/annotations.exception";
import type { UpdateOrderDto } from "./dto/update-order.dto";
import type { UpdateAnnotationDto } from "./dto/update.dto";
import type { AnnotationSafeDto } from "./dto/annotationSafe.dto";
import type { DeleteAnnotationDto } from "./dto/delete.dto";
import type { AnnotationDto } from "./dto/annotation.dto";
import type { CreateAnnotationDto } from "./dto/create.dto";

@Injectable()
export class AnnotationsService {
	constructor(
		@InjectRepository(Annotation)
		private annotationsRepository: Repository<Annotation>,
		private usersService: UsersService,
	) {}

	private validateTitle(title: string): void {
		if (!title) throw new TitleRequiredException();
	}

	private async findUserAnnotation(
		id: string,
		userId: string,
	): Promise<Annotation> {
		const annotation = await this.annotationsRepository.findOne({
			where: { id, owner: { id: userId } },
		});

		if (!annotation) throw new AnnotationNotFoundException();

		return annotation;
	}

	private async reorderPositions(userId: string): Promise<void> {
		const allAnnotations = await this.annotationsRepository.find({
			where: { owner: { id: userId } },

			order: { position: "ASC" },
		});

		const activeAnnotations = allAnnotations.filter(
			(a) => a.deleted_at === null,
		);

		activeAnnotations.forEach((annotation, index) => {
			annotation.position = index;
		});

		const deletedAnnotations = allAnnotations.filter(
			(a) => a.deleted_at !== null,
		);

		deletedAnnotations.forEach((annotation, index) => {
			annotation.position = activeAnnotations.length + index;
		});

		await this.annotationsRepository.save([
			...activeAnnotations,
			...deletedAnnotations,
		]);
	}

	async create(
		annotationDto: CreateAnnotationDto,
		userId: string,
	): Promise<AnnotationSafeDto> {
		const owner = await this.usersService.findById(userId);

		const { title, content, description } = annotationDto;

		this.validateTitle(title);

		await this.annotationsRepository.update(
			{ owner: { id: owner.id } },
			{ position: () => "position + 1" },
		);

		const newAnnotation = this.annotationsRepository.create({
			owner,
			title,
			content,
			description,
			position: 0,
		});

		return await this.annotationsRepository.save(newAnnotation);
	}

	async findAll(userId: string): Promise<Annotation[]> {
		return this.annotationsRepository.find({
			where: { owner: { id: userId }, deleted_at: IsNull() },
			order: { position: "ASC" },
		});
	}

	async findAllDeleted(userId: string): Promise<AnnotationDto[]> {
		return this.annotationsRepository.find({
			where: {
				owner: { id: userId },
				deleted_at: Not(IsNull()),
				isActive: true,
			},
			order: { deleted_at: "ASC" },
		});
	}

	async updateOrder(
		updateOrderDto: UpdateOrderDto,
		userId: string,
	): Promise<Annotation[]> {
		const userFetch = await this.usersService.findById(userId);

		const { id, newPosition } = updateOrderDto;
		const annotationToMove = await this.findUserAnnotation(id, userId);

		if (annotationToMove.position === newPosition) {
			throw new BadRequestException("You don't move annotation here");
		}

		const allAnnotations = await this.annotationsRepository.find({
			where: { owner: { id: userFetch.id } },
			order: { position: "ASC" },
		});

		const filteredAnnotations = allAnnotations.filter((a) => a.id !== id);
		filteredAnnotations.splice(newPosition, 0, annotationToMove);

		const updateAnnotations = filteredAnnotations.map((annotation, index) => ({
			...annotation,
			position: index,
		}));

		return this.annotationsRepository
			.save(updateAnnotations)
			.then((savedAnnotations) =>
				savedAnnotations.sort((a, b) => a.position - b.position),
			);
	}

	async update(
		updateAnnotationDto: UpdateAnnotationDto,
		userId: string,
	): Promise<AnnotationSafeDto> {
		const { id, title, content, description } = updateAnnotationDto;
		const annotation = await this.findUserAnnotation(id, userId);

		if (!annotation) {
			throw new BadRequestException("Annotation not found");
		}

		annotation.title = title ?? annotation.title;
		annotation.content = content ?? annotation.content;
		annotation.description = description ?? annotation.description;

		return this.annotationsRepository.save(annotation);
	}

	async findAnnotationsToDelete(dateDelete: Date): Promise<Annotation[]> {
		return this.annotationsRepository.find({
			where: { deleted_at: LessThan(dateDelete) },
		});
	}

	async delete(
		deleteDto: DeleteAnnotationDto,
		userId: string,
	): Promise<AnnotationSafeDto> {
		const annotation = await this.findUserAnnotation(deleteDto.id, userId);

		if (annotation.deleted_at === null) {
			annotation.deleted_at = new Date();

			const annotationModify =
				await this.annotationsRepository.save(annotation);

			await this.reorderPositions(userId);
			return annotationModify;
		}

		throw new AnnotationNotFoundException();
	}

	async toogleAnnotationActivity(
		deleteDto: DeleteAnnotationDto,
		userId: string,
	): Promise<AnnotationSafeDto> {
		const annotation = await this.findUserAnnotation(deleteDto.id, userId);

		annotation.isActive = !annotation.isActive;

		return await this.annotationsRepository.save(annotation);
	}

	async deleteAnnotationsFromUser(annotations: Annotation[]): Promise<number> {
		if (!annotations.length) return 0;

		for (const annotation of annotations) {
			annotation.isActive = false;
		}

		const result = await this.annotationsRepository.save(annotations);

		return result.length;
	}

	async deletePermanently(annotations: Annotation[]): Promise<number> {
		if (!annotations.length) return 0;

		const result = await this.annotationsRepository.remove(annotations);

		return result.length;
	}

	async restore(
		deleteDto: DeleteAnnotationDto,
		userId: string,
	): Promise<AnnotationSafeDto> {
		const annotation = await this.findUserAnnotation(deleteDto.id, userId);

		if (annotation.deleted_at == null && annotation.isActive === true) {
			throw new RestoreAnnotationNotFoundException();
		}

		annotation.deleted_at = null;
		annotation.isActive = true;

		const annotationModify = await this.annotationsRepository.save(annotation);

		await this.reorderPositions(userId);

		return annotationModify;
	}
}
