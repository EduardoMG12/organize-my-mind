import { CreateAnnotationDto } from "./dto/update-title.dto";
import type { Test, TestingModule } from "@nestjs/testing";
import { AnnotationsService } from "./annotations.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Annotation } from "src/entities/annotation.entity";
import type { User } from "src/entities/user.entity";

describe("AnnotationService", () => {
	let service: AnnotationsService;
	let repository: Repository<Annotation>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AnnotationsService,
				{
					provide: getRepositoryToken(Annotation),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<AnnotationsService>(AnnotationsService);
		repository = module.get<Repository<Annotation>>(
			getRepositoryToken(Annotation),
		);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create an annotation", async () => {
		const annotationData = {
			title: "Test Annotation",
			content: "This is a test content",
		};

		const user: User = { id: 1 } as User; // Cast explícito
		const createdAnnotation: Annotation = {
			id: 1,
			...annotationData,
			position: 0,
			user,
		} as Annotation;

		jest.spyOn(repository, "increment").mockResolvedValue(undefined as any);
		jest
			.spyOn(repository, "create")
			.mockReturnValue(createdAnnotation as Annotation);
		jest.spyOn(repository, "save").mockResolvedValue(createdAnnotation);

		const result = await service.create(annotationData, user as any);

		expect(repository.increment).toHaveBeenCalledWith({ user }, "position", 1);
		expect(repository.create).toHaveBeenCalledWith({
			user,
			...annotationData,
			position: 0,
		});
		expect(repository.save).toHaveBeenCalledWith(createdAnnotation);
		expect(result).toEqual(createdAnnotation);
	});

	it("should update the order of annotations", async () => {
		const user: User = { id: 1 } as User;
		const annotations: Annotation[] = [
			{ id: 1, title: "First", content: "", position: 0, user } as Annotation,
			{ id: 2, title: "Second", content: "", position: 1, user } as Annotation,
			{ id: 3, title: "Third", content: "", position: 2, user } as Annotation,
		];

		const annotationToMove = annotations[1];
		const newPosition = 0;

		jest.spyOn(repository, "findOne").mockResolvedValue(annotationToMove);
		jest.spyOn(repository, "find").mockResolvedValue(annotations);
		jest
			.spyOn(repository, "save")
			.mockImplementation(async (data) => data as any);

		const result = await service.updateOrder({ id: 2, newPosition }, user);

		expect(result[0].id).toBe(2);
		expect(result[0].position).toBe(0);
		expect(result[1].id).toBe(1);
		expect(result[1].position).toBe(1);
		expect(repository.save).toHaveBeenCalled();
	});

	it("should update an annotation", async () => {
		const user: User = { id: 1 } as User;
		const existingAnnotation: Annotation = {
			id: 1,
			title: "Old Title",
			content: "Old Content",
			position: 0,
			user,
		} as Annotation;

		const updateData = { id: 1, title: "New Title", content: "New Content" };

		jest.spyOn(repository, "findOne").mockResolvedValue(existingAnnotation);
		jest
			.spyOn(repository, "save")
			.mockImplementation(async (data) => data as Annotation);

		const result = await service.update(updateData, user);

		expect(result.title).toBe("New Title");
		expect(result.content).toBe("New Content");
		expect(repository.save).toHaveBeenCalledWith({
			...existingAnnotation,
			...updateData,
		});
	});

	it("should return all annotations for a user", async () => {
		const user: User = { id: 1 } as User;
		const annotations: Annotation[] = [
			{ id: 1, title: "Note 1", content: "", position: 0, user } as Annotation,
			{ id: 2, title: "Note 2", content: "", position: 1, user } as Annotation,
		];

		jest.spyOn(repository, "findBy").mockResolvedValue(annotations);

		const result = await service.findAll(user);

		expect(result).toEqual(annotations);
		expect(repository.findBy).toHaveBeenCalledWith({ id: user.id });
	});

	it("should delete an annotation", async () => {
		const user: User = { id: 1 } as User;
		const annotation: Annotation = {
			id: 1,
			title: "To Delete",
			content: "",
			position: 0,
			user,
		} as Annotation;

		jest.spyOn(repository, "findOne").mockResolvedValue(annotation);
		jest.spyOn(repository, "remove").mockResolvedValue(annotation);

		const result = await service.delete(1, user);

		expect(result).toEqual(annotation);
		expect(repository.remove).toHaveBeenCalledWith(annotation);
	});
});
