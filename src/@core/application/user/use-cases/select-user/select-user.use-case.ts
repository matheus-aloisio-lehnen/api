import { Injectable } from '@nestjs/common';

import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";
import { UserEntityRepository } from "../../../../infra/database/type-orm/repository/user-entity.repository";
import { User } from "../../../../domain/model/user";
import { PaginationFilter } from "../../../../domain/dto/filter/paginationFilter";

@Injectable()
export class SelectUser {


    constructor(
        private repository: UserEntityRepository,
    ) {
    }

    async getAll(): Promise<RecursivePartial<User>[]> {
        return await this.repository.getAllUsers();
    }

    async getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<User>[], number ]> {
        return await this.repository.getAllPaginated(filter);
    }

    async getById(id: number): Promise<RecursivePartial<User>> {
        return await this.repository.getUserById(id);
    }

    async getUserByEmail(email: string): Promise<RecursivePartial<User>> {
        return await this.repository.getUserByEmail(email);
    }

}
