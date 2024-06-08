import { Injectable } from '@nestjs/common';

import { ResetPasswordsEntityRepository } from "../../../../../infra/database/type-orm/repository/reset-passwords-entity.repository";
import { RecursivePartial } from "../../../../../domain/type/recursive-partial.type";
import { ResetPasswordEntity } from "../../../../../infra/database/type-orm/entities/reset-password.entity";
import { ResetPasswordStatus } from "../../../../../domain/enum/reset-password-status.enum";
import { FindOptionsWhere } from "typeorm";
import { UserEntity } from "../../../../../infra/database/type-orm/entities/user.entity";


@Injectable()
export class UpdateResetPasswordStatus {

    constructor(
        private repository: ResetPasswordsEntityRepository,
    ) {
    }

    async updateStatusChangePassword(id: string) {
        const where: FindOptionsWhere<ResetPasswordEntity> = { id: id }
        const entity: RecursivePartial<ResetPasswordEntity> = { status: ResetPasswordStatus.used }
        await this.repository.updateStatus(where, entity);
    }

    async updateStatusForgotPassword(userEntity: RecursivePartial<UserEntity>) {
        const where: FindOptionsWhere<ResetPasswordEntity> = { user: {  id: userEntity.id }, status: ResetPasswordStatus.active }
        const entity: RecursivePartial<ResetPasswordEntity> = { status: ResetPasswordStatus.expired }
        await this.repository.updateStatus(where, entity);
    }

}
