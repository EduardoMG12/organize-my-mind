import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import type { AnnotationsService } from "src/annotations/annotations.service";

@Injectable()
export class DeleteSchedulerService {
	private readonly logger = new Logger(DeleteSchedulerService.name);

	constructor(private readonly annotationsService: AnnotationsService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async deleteOldAnnotations() {
		this.logger.log("Begin clean of deleted annotations...");

		const fifteenDaysAgo = new Date();
		const thirdDaysAgo = new Date();
		fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
		thirdDaysAgo.setDate(fifteenDaysAgo.getDate() - 30);

		try {
			const annotationsToDeleteToUser =
				await this.annotationsService.findAnnotationsToDelete(fifteenDaysAgo);
			const deleteToUser =
				await this.annotationsService.deleteAnnotationsFromUser(
					annotationsToDeleteToUser,
				);
			const annotationsToDeletePermanently =
				await this.annotationsService.findAnnotationsToDelete(thirdDaysAgo);
			const deleteCount = await this.annotationsService.deletePermanently(
				annotationsToDeletePermanently,
			);
			this.logger.log(
				`Permanently deleted annotations: ${deleteCount} and deleted for users: ${deleteToUser}`,
			);
		} catch (err) {
			this.logger.log(`Error clean annotations: ${err}`);
		}

		this.logger.log("Done clean annotations");
	}
}
