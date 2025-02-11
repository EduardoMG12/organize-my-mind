import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AnnotationsService } from 'src/annotations/annotations.service';

@Injectable()
export class DeleteSchedulerService {
    private readonly logger = new Logger(DeleteSchedulerService.name);

    constructor(private readonly annotationsService: AnnotationsService) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async deleteOldAnnotations() {
        this.logger.log('Begin clean of deleted annotations...');

        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        try {
            const annotationsToDelete = await this.annotationsService.findAnnotationsToDelete(fifteenDaysAgo);
            const deleteCount = await this.annotationsService.deletePermanently(annotationsToDelete);
            this.logger.log(`Permanently deleted annotations: ${deleteCount}`)
        } catch (err) {
            this.logger.log(`Error clean annotations: ${err}`)
        }

        this.logger.log('Done clean annotations')
    }
}
