import { Expose } from 'class-transformer';
import { Item } from 'src/entities/item.entity';

export class SafeUser {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    fullName: string;

    @Expose()
    email: string;

    @Expose()
    isPublic: boolean;

    @Expose()
    bio: string;

    @Expose()
    created_at: Date;

    @Expose()
    items: Item[];
}