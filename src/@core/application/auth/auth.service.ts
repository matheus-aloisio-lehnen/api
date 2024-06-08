import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

import { User } from "../../domain/model/user";
import { SignInDto } from "../../domain/dto/auth/sign-in/sign-in.dto";
import { ForgotPasswordDto } from "../../domain/dto/auth/reset-password/forgot-password.dto";
import { RecursivePartial } from "../../domain/type/recursive-partial.type";
import { NOTIFICATION_MICROSERVICE } from "../../infra/config/microservices.config";
import { ClientProxy } from "@nestjs/microservices";
import { SelectUser } from "../user/use-cases/select-user/select-user.use-case";
import { CheckUserExists } from "./use-cases/sign-in/check-user-exists/check-user-exists.use-case";
import { CompareUserPassword } from "./use-cases/sign-in/compare-user-password/compare-user-password.use-case";
import { CreateResetPassword } from "./use-cases/reset-password/create-reset-password/create-reset-password.use-case";
import { MessagePatterns } from "../../domain/enum/message-patterns.enum";
import { CheckResetPasswordActivation } from "./use-cases/reset-password/check-reset-password-activation/check-reset-password-activation.use-case";
import { ResetPassword } from "../../domain/model/reset-password";
import { ChangePassword } from "./use-cases/reset-password/change-password/change-password.use-case";
import { UserEntity } from "../../infra/database/type-orm/entities/user.entity";
import { EmailSubjects } from "../../domain/enum/email-notification-subjects.enum";
import { Result } from "../../domain/type/result.type";
import { Auth } from "../../domain/model/auth";
import { UpdateResetPasswordStatus } from "./use-cases/reset-password/update-reset-password/update-reset-password-status.use-case";
import { Email } from "../../domain/type/email.type";
import { SelectResetPassword } from "./use-cases/reset-password/select-reset-password/select-reset-password.use-case";


@Injectable()
export class AuthService {


    constructor(
        @Inject(NOTIFICATION_MICROSERVICE) private client: ClientProxy,
        private jwtService: JwtService,
        private checkUserExists: CheckUserExists,
        private compareUserPassword: CompareUserPassword,
        private selectUser: SelectUser,
        private checkResetPasswordActivation: CheckResetPasswordActivation,
        private createResetPassword: CreateResetPassword,
        private changePassword: ChangePassword,
        private updateResetPasswordStatus: UpdateResetPasswordStatus,
        private selectResetPassword: SelectResetPassword
    ) {
    }

    async validateUser(signInDto: SignInDto): Promise<Result<User | boolean>> {
        await this.checkUserExists.exists(signInDto.email);
        const fullUser = await this.selectUser.getUserByEmail(signInDto.email);
        await this.compareUserPassword.compare(fullUser.password, signInDto.password);
        const user = await this.selectUser.getById(fullUser.id);
        const auth: Auth = { token: this.jwtService.sign(user), user: user };
        return {
            data: auth,
            message: "Usuário autenticado com sucesso. Seja bem vindo!"
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<boolean> {
        await this.checkUserExists.exists(forgotPasswordDto.email);
        const user = await this.selectUser.getUserByEmail(forgotPasswordDto.email);
        await this.updateResetPasswordStatus.updateStatusForgotPassword(user);

        const resetPassword = await this.createResetPassword.create(user);
        const email: Email = {
            to: resetPassword.user.email,
            subject: EmailSubjects.forgotPassword,
            data: resetPassword
        }
        this.client.send(MessagePatterns.sendEmail, email).subscribe(result => console.log('result notification: ', result));
        return true;
    }

    async hasValidResetPassword(id: string): Promise<RecursivePartial<ResetPassword>> {
        return await this.checkResetPasswordActivation.checkActiveResetLink(id);
    }

    async changeUserPassword(id: string, entity: RecursivePartial<UserEntity>): Promise<boolean> {
        await this.changePassword.update(entity.id, entity);
        await this.updateResetPasswordStatus.updateStatusChangePassword(id);
        const resetPassword = await this.selectResetPassword.getResetPasswordById(id);
        const email: Email = {
            to: resetPassword.user.email,
            subject: EmailSubjects.changePassword,
            data: resetPassword
        }
        this.client.send(MessagePatterns.sendEmail, email).subscribe();
        return true;
    }

}