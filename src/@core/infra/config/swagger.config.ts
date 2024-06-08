import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SwaggerConfig {
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
}

export const configureSwagger = (app: INestApplication, swaggerConfig: SwaggerConfig) => {
    if (swaggerConfig.enabled) {
        const options = new DocumentBuilder()
            .setTitle(swaggerConfig.title)
            .setDescription(swaggerConfig.description)
            .setVersion(swaggerConfig.version)
            .build();
        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup(swaggerConfig.path, app, document);
    }
};


