import { Injectable } from '@nestjs/common';

import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";
import { UserEntityRepository } from "../../../../infra/database/type-orm/repository/user-entity.repository";
import { User } from "../../../../domain/model/user";

@Injectable()
export class RemoveUser {


    constructor(
        private repository: UserEntityRepository,
    ) {
    }

    async remove(id: number) {
        return await this.repository.removeUser(id);
    }

    async removeBulk(ids: string): Promise<RecursivePartial<User>[]> {
        return this.repository.removeBulk(ids);
    }
}
