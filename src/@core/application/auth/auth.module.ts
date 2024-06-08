import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "../../infra/security/strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../infra/security/strategies/jwt.strategy";

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_CONFIG } from "../../infra/config/jwt.config";
import { InfraModule } from "../../infra/infra.module";
import { CheckUsedEmail } from "../user/use-cases/check-used-email/check-used-email.use-case";
import { CheckUserExists } from "./use-cases/sign-in/check-user-exists/check-user-exists.use-case";
import { CompareUserPassword } from "./use-cases/sign-in/compare-user-password/compare-user-password.use-case";
import { SelectUser } from "../user/use-cases/select-user/select-user.use-case";
import { CheckResetPasswordActivation } from "./use-cases/reset-password/check-reset-password-activation/check-reset-password-activation.use-case";
import { CreateResetPassword } from "./use-cases/reset-password/create-reset-password/create-reset-password.use-case";
import { ChangePassword } from "./use-cases/reset-password/change-password/change-password.use-case";
import { UpdateResetPasswordStatus } from "./use-cases/reset-password/update-reset-password/update-reset-password-status.use-case";
import { SelectResetPassword } from "./use-cases/reset-password/select-reset-password/select-reset-password.use-case";

@Module({
    imports: [
        InfraModule,
        PassportModule,
        JwtModule.register(JWT_CONFIG),

    ],
    controllers: [ AuthController ],
    providers: [
        LocalStrategy,
        JwtStrategy,
        CheckUserExists,
        CompareUserPassword,
        CheckResetPasswordActivation,
        CreateResetPassword,
        ChangePassword,
        SelectUser,
        CheckUsedEmail,
        UpdateResetPasswordStatus,
        SelectResetPassword,
        AuthService,
    ],
})
export class AuthModule {}
