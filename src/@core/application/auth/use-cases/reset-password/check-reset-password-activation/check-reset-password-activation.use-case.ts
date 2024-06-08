import { BadRequestException, Injectable } from '@nestjs/common';

import { ResetPasswordStatus } from "../../../../../domain/enum/reset-password-status.enum";
import { RecursivePartial } from "../../../../../domain/type/recursive-partial.type";
import { ResetPassword } from "../../../../../domain/model/reset-password";
import { SelectResetPassword } from "../select-reset-password/select-reset-password.use-case";

@Injectable()
export class CheckResetPasswordActivation {


    constructor(
        private selectResetPassword: SelectResetPassword
    ) {
    }

    async checkActiveResetLink(id: string): Promise<RecursivePartial<ResetPassword>> {
        const resetPassword = await this.selectResetPassword.getResetPasswordById(id);

        if (!resetPassword) {
            throw new BadRequestException("Não foi possível encontrar este link de ativação. Solicite um informando seu email.");
        }

        if (resetPassword.status !== ResetPasswordStatus.active) {
            throw new BadRequestException("Este link já expirou. Solicite um novo.");
        }

        return resetPassword;
    }

}
