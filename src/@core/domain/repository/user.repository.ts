import { User } from "../model/user";
import { PaginationFilter } from "../dto/filter/paginationFilter";
import { FindManyOptions } from "typeorm";
import { UserEntity } from "../../infra/database/type-orm/entities/user.entity";
import { RecursivePartial } from "../type/recursive-partial.type";

export interface UserRepository  {
    getAllUsers(): Promise<RecursivePartial<User>[]>;
    getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<User>[], number ]>;
    getUserById(id: number): Promise<RecursivePartial<User>>;
    getUserByEmail(email: string): Promise<RecursivePartial<User>>;
    updateUser(id: number, entity: RecursivePartial<User>): Promise<RecursivePartial<User>>;
    createUser(entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>>;
    createBulk(entities: RecursivePartial<UserEntity>[]): Promise<RecursivePartial<User>[]>;
    removeUser(id: number): Promise<RecursivePartial<User>>;
    removeBulk(ids: string): Promise<RecursivePartial<User>[]>;
    exists(where: FindManyOptions): Promise<boolean>;
}
