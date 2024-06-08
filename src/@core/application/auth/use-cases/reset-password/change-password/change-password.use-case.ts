import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntityRepository } from "../../../../../infra/database/type-orm/repository/user-entity.repository";
import { RecursivePartial } from "../../../../../domain/type/recursive-partial.type";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../../../../../infra/database/type-orm/entities/user.entity";

@Injectable()
export class ChangePassword {

    constructor(
        private repository: UserEntityRepository,
    ) {
    }

    async exists(email: string) {
        const exists = await this.repository.exists({ where: { email: email } })
        if (!exists) {
            throw new NotFoundException("Usuário não encontrado!");
        }
    }

    async update(id: number, entity: RecursivePartial<UserEntity>) {
        entity.password = await bcrypt.hash(entity.password, Number(process.env.SALT_OR_ROUNDS));
        return this.repository.updateUser(id, entity);
    }
}
