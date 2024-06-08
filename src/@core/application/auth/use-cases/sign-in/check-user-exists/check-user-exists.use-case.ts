import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntityRepository } from "../../../../../infra/database/type-orm/repository/user-entity.repository";

@Injectable()
export class CheckUserExists {

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

}
