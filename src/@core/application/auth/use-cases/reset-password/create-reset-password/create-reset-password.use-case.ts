import { Injectable } from '@nestjs/common';
import { addDays } from "date-fns";

import { ResetPasswordsEntityRepository } from "../../../../../infra/database/type-orm/repository/reset-passwords-entity.repository";
import { RecursivePartial } from "../../../../../domain/type/recursive-partial.type";
import { User } from "../../../../../domain/model/user";
import { ResetPassword } from "../../../../../domain/model/reset-password";
import { ResetPasswordEntity } from "../../../../../infra/database/type-orm/entities/reset-password.entity";
import { toEntity } from "../../../../../infra/utils/mapper/mapper.utils";



@Injectable()
export class CreateResetPassword {


    constructor(
        private repository: ResetPasswordsEntityRepository,
    ) {
    }

    async create(user: RecursivePartial<User>): Promise<RecursivePartial<ResetPassword>> {
        const now = new Date();
        const tomorrow = addDays(now, 1);

        const entity: RecursivePartial<ResetPasswordEntity> = {
            user: toEntity(user),
            expiresAt: tomorrow
        }
        return await this.repository.createResetPassword(entity);
    }
}
