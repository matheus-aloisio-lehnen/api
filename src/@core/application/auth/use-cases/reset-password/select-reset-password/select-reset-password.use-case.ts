import { Injectable } from '@nestjs/common';

import { ResetPasswordsEntityRepository } from "../../../../../infra/database/type-orm/repository/reset-passwords-entity.repository";
import { ResetPasswordEntity } from "../../../../../infra/database/type-orm/entities/reset-password.entity";
import { FindOneOptions, FindOptionsRelations, FindOptionsSelect } from "typeorm";
import { RecursivePartial } from "../../../../../domain/type/recursive-partial.type";


@Injectable()
export class SelectResetPassword {


    select: FindOptionsSelect<ResetPasswordEntity>;
    relations: FindOptionsRelations<ResetPasswordEntity>

    constructor(
        private repository: ResetPasswordsEntityRepository,
    ) {
        this.select = {
            id: true,
            status: true,
            expiresAt: true,
            user: { id: true, email: true, personalData: { id: true, name: true }, }
        };
        this.relations = {
            user: { personalData: true }
        }
    }

    async getResetPasswordById(id: string): Promise<RecursivePartial<ResetPasswordEntity>> {
        const options: FindOneOptions = {
            select: this.select,
            where: { id: id },
            relations: this.relations,
            loadEagerRelations: false,
        }

        return await this.repository.getResetPassword(options);
    }

    async getResetPasswordByUserId(userId: number): Promise<RecursivePartial<ResetPasswordEntity>> {
        const options: FindOneOptions = {
            select: this.select,
            where: { user: { id: userId } },
            relations: this.relations,
            loadEagerRelations: false,
        }
        return await this.repository.getResetPassword(options);
    }

}
