import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from "./user.service";
import { HttpService } from "../../infra/services/http/http.service";
import { HttpModule } from "@nestjs/axios";
import { InfraModule } from "../../infra/infra.module";
import { CreateUser } from "./use-cases/create-user/create-user.use-case";
import { UpdateUser } from "./use-cases/update-user/update-user.use-case";
import { SelectUser } from "./use-cases/select-user/select-user.use-case";
import { RemoveUser } from "./use-cases/remove-user/remove-user.use-case";
import { CheckUsedEmail } from "./use-cases/check-used-email/check-used-email.use-case";

@Module({
    controllers: [ UserController ],
    imports: [
        HttpModule,
        InfraModule,
    ],
    providers: [
        CreateUser,
        UpdateUser,
        SelectUser,
        RemoveUser,
        CheckUsedEmail,
        UserService,
        HttpService,
    ],
})
export class UserModule {
}
