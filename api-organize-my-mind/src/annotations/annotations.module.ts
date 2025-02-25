import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnnotationsService } from "./annotations.service";
import { Annotation } from "src/entities/annotation.entity";
import { AnnotationsController } from "./annotations.controller";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [TypeOrmModule.forFeature([Annotation]), UsersModule],
	providers: [AnnotationsService],
	controllers: [AnnotationsController],
	exports: [AnnotationsService],
})
export class AnnotationsModule {}
