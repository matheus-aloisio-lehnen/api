import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

import { configureSwagger } from './@core/infra/config/swagger.config';
import { configureGlobalPipes } from "./@core/infra/config/global-pipe.config";
import { configureGlobalFilters } from "./@core/infra/config/global-filters.config";
import { configureGlobalInterceptors } from "./@core/infra/config/global-interceptors.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService).get('app');

    configureGlobalPipes(app);
    configureGlobalFilters(app);
    configureGlobalInterceptors(app);
    configureSwagger(app, config.swagger);

    if (config.cors.enabled) {
        app.enableCors();
    }
    await app.listen(config.nest.port);
}

bootstrap();

