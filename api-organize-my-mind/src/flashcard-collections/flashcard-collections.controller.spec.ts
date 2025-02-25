import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardCollectionsController } from './flashcard-collections.controller';

describe('FlashcardCollectionsController', () => {
  let controller: FlashcardCollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardCollectionsController],
    }).compile();

    controller = module.get<FlashcardCollectionsController>(FlashcardCollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
