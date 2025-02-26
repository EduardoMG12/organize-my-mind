import { Module } from "@nestjs/common";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";
import { Flashcard } from "src/entities/flashcard.entity";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Flashcard]), UsersModule],
	controllers: [CardController],
	providers: [CardService],
	exports: [CardService],
})
export class CardModule {}
