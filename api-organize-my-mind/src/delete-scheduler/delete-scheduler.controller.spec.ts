import { Test, TestingModule } from "@nestjs/testing";
import { DeleteSchedulerController } from "./delete-scheduler.controller";

describe("DeleteSchedulerController", () => {
	let controller: DeleteSchedulerController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DeleteSchedulerController],
		}).compile();

		controller = module.get<DeleteSchedulerController>(
			DeleteSchedulerController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
