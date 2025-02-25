import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "./config/swagger";
import { JwtAuthGuard } from "./config/guards";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	setupSwagger(app);

	const reflector = app.get(Reflector);
	app.useGlobalGuards(new JwtAuthGuard(reflector));

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { excludeExtraneousValues: true },
		}),
	);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
