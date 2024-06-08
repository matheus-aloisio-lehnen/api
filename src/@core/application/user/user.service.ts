import { Injectable } from '@nestjs/common';

import { User } from "../../domain/model/user";
import { PaginationFilter } from "../../domain/dto/filter/paginationFilter";
import { CreateUser } from "./use-cases/create-user/create-user.use-case";

import { UserEntity } from "../../infra/database/type-orm/entities/user.entity";
import { RecursivePartial } from 'src/@core/domain/type/recursive-partial.type';
import { UpdateUser } from "./use-cases/update-user/update-user.use-case";
import { SelectUser } from "./use-cases/select-user/select-user.use-case";
import { RemoveUser } from "./use-cases/remove-user/remove-user.use-case";


@Injectable()
export class UserService {


    constructor(
        private createUser: CreateUser,
        private updateUser: UpdateUser,
        private selectUser: SelectUser,
        private removeUser: RemoveUser,
    ) {
    }

    async getAll(): Promise<RecursivePartial<User>[]> {
        return await this.selectUser.getAll();
    }

    async getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<User>[], number ]> {
        return await this.selectUser.getAllPaginated(filter);
    }

    async getById(id: number): Promise<RecursivePartial<User>> {
        return await this.selectUser.getById(id);
    }

    async getUserByEmail(email: string): Promise<RecursivePartial<User>> {
        return await this.selectUser.getUserByEmail(email);
    }

    async create(entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>> {
        return await this.createUser.createUser(entity);
    }

    async createBulk(entities: RecursivePartial<UserEntity>[]): Promise<RecursivePartial<User>[]> {
        return this.createUser.createBulk(entities);
    }

    async update(id: number, entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>> {
        return await this.updateUser.updateUser(id, entity)
    }

    async remove(id: number) {
        return await this.removeUser.remove(id);
    }

    async removeBulk(ids: string): Promise<RecursivePartial<User>[]> {
        return this.removeUser.removeBulk(ids);
    }

}
