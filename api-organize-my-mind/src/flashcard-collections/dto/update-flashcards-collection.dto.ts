import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateFlashcardCollectionDto {
    @IsOptional()
    @IsString()
    @Expose()
    title?: string;

    @IsOptional()
    @IsString()
    @Expose()
    description?: string;

    @IsOptional()
    @IsString()
    @Expose()
    visibility?: string; // futuro enum

    @IsOptional()
    @IsNumber()
    @Expose()
    position?: number;

    @IsOptional()
    @IsBoolean()
    @Expose()
    isActive?: boolean;
}
