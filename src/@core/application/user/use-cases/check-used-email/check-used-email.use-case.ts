import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyOptions, Not } from "typeorm";
import { UserEntityRepository } from "../../../../infra/database/type-orm/repository/user-entity.repository";


@Injectable()
export class CheckUsedEmail {

    constructor(
        private repository: UserEntityRepository,
    ) {}

    async exists(context: string, email: string, id: number = null): Promise<true | void> {
        const where: FindManyOptions = context !== 'update'
            ? { where: { email: email } }
            : { where: { id: Not(id), email: email } }

        const emailAlreadyUsed = await this.repository.exists(where);

        if (emailAlreadyUsed) {
            throw new BadRequestException('Email já está em uso')
        }

        return true;
    }

}
