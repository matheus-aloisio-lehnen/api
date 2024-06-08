import { Module } from '@nestjs/common';

import APP_CONFIG from "./config/app.config";
import { DATASOURCE_CONFIG } from "./config/datasource.config";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogEntity } from "./database/type-orm/entities/log.entity";
import { UserEntity } from "./database/type-orm/entities/user.entity";
import { AccountEntity } from "./database/type-orm/entities/account.entity";
import { UserEntityRepository } from "./database/type-orm/repository/user-entity.repository";
import { LogService } from "./observability/log/service/log.service";
import { AccountEntityRepository } from "./database/type-orm/repository/account-entity.repository";
import { LogEntityRepository } from "./database/type-orm/repository/log-entity.repository";
import { HttpAdapter } from './services/http/adapter/http.adapter';
import { HttpModule } from "@nestjs/axios";
import { HttpService } from "./services/http/http.service";
import { ResetPasswordsEntityRepository } from "./database/type-orm/repository/reset-passwords-entity.repository";
import { ResetPasswordEntity } from "./database/type-orm/entities/reset-password.entity";
import { ClientsModule } from "@nestjs/microservices";
import { MICROSERVICES_CONFIG } from "./config/microservices.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [ APP_CONFIG ],
        }),
        TypeOrmModule.forRoot(DATASOURCE_CONFIG),
        TypeOrmModule.forFeature([ UserEntity, AccountEntity, LogEntity, ResetPasswordEntity ]),
        ClientsModule.register(MICROSERVICES_CONFIG),
        HttpModule
    ],
    providers: [
        UserEntityRepository,
        AccountEntityRepository,
        LogEntityRepository,
        ResetPasswordsEntityRepository,
        LogService,
        HttpService,
        HttpAdapter
    ],
    exports: [
        UserEntityRepository,
        AccountEntityRepository,
        LogEntityRepository,
        ResetPasswordsEntityRepository,
        LogService,
        HttpService,
        ClientsModule
    ],
})
export class InfraModule {
}
