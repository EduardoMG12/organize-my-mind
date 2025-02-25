import { Expose } from 'class-transformer';

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FlashcardCollectionSafeDto {
    @Expose()
    id: string;

    @IsString()
    @Expose()
    title: string;

    @IsOptional()
    @IsString()
    @Expose()
    description?: string;

    @IsString()
    @Expose()
    visibility: string; // isso sera um enum

    @IsNumber()
    @Expose()
    position: number;

    @IsBoolean()
    @Expose()
    isActive: boolean;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
}
