import { Expose } from "class-transformer";
import { User } from "src/entities/user.entity";

export class AnnotationDto {
    @Expose()
    id: number;

    owner: User;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    position: number;

    @Expose()
    created_at: Date;

    @Expose()
    update_at: Date;
}
