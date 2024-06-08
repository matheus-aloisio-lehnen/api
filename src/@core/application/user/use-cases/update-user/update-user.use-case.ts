import { Injectable } from '@nestjs/common';

import { UserEntity } from "../../../../infra/database/type-orm/entities/user.entity";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";
import { UserEntityRepository } from "../../../../infra/database/type-orm/repository/user-entity.repository";
import { User } from "../../../../domain/model/user";
import { CheckUsedEmail } from "../check-used-email/check-used-email.use-case";

@Injectable()
export class UpdateUser {


    constructor(
        private checkUsedEmail: CheckUsedEmail,
        private repository: UserEntityRepository,
    ) {
    }

    async updateUser(id: number, entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>> {
        await this.checkUsedEmail.exists('update', entity.email, id);
        return await this.repository.updateUser(id, entity);
    }

}
