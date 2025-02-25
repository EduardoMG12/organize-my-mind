import { Module } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';

@Module({
  providers: [FlashcardService]
})
export class FlashcardModule {}
