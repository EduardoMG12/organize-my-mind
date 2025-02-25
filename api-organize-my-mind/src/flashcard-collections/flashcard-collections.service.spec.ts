import { Test, TestingModule } from "@nestjs/testing";
import { FlashcardCollectionsService } from "./flashcard-collections.service";

describe("FlashcardCollectionsService", () => {
	let service: FlashcardCollectionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FlashcardCollectionsService],
		}).compile();

		service = module.get<FlashcardCollectionsService>(
			FlashcardCollectionsService,
		);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
