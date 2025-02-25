import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateFlashcardCollectionDto {
    @IsString()
    @Expose()
    title: string;

    @IsOptional()
    @IsString()
    @Expose()
    description?: string;

    @IsString()
    @Expose()
    owner: string; // ou user, qual seria melhor sera?

    @IsString()
    visibility: string; // isso sera um enum

    @IsNumber()
    position: number;

    @IsBoolean()
    isActive: boolean;
}
