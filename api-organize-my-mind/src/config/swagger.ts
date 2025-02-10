import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Organize My Mind API')
        .setDescription('API documentation for user authentication and management.')
        .setVersion('1.0')
        .addBearerAuth() // Adiciona suporte a autenticação JWT
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
}
