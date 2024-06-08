import { Module } from '@nestjs/common';

import { ApplicationModule } from './@core/application/application.module';
import { InfraModule } from './@core/infra/infra.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
    imports: [
        ApplicationModule,
        InfraModule,

    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {
}
