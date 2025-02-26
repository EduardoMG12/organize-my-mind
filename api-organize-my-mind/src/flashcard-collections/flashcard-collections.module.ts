import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlashcardCollectionsService } from "./flashcard-collections.service";
import { FlashcardCollection } from "src/entities/flashcards.entity";
import { FlashcardCollectionsController } from "./flashcard-collections.controller";
import { UsersModule } from "src/users/users.module";
@Module({
	imports: [
		TypeOrmModule.forFeature([FlashcardCollection]),
		UsersModule,
		// FlashdardModule
	],
	providers: [FlashcardCollectionsService],
	controllers: [FlashcardCollectionsController],
	exports: [FlashcardCollectionsService],
})
export class FlashcardCollectionsModule {}
