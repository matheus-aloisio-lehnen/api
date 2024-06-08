import { PaginationFilter } from "../dto/filter/paginationFilter";
import { RecursivePartial } from "../type/recursive-partial.type";
import { ResetPasswordEntity } from "../../infra/database/type-orm/entities/reset-password.entity";
import { ResetPassword } from "../model/reset-password";
import { FindOneOptions, FindOptionsWhere } from "typeorm";

export interface ResetPasswordsRepository {
    getAllResetPasswords(): Promise<RecursivePartial<ResetPassword>[]>;
    getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<ResetPassword>[], number ]>;
    getResetPassword(options: FindOneOptions): Promise<RecursivePartial<ResetPassword>>;
    createResetPassword(entity: RecursivePartial<ResetPasswordEntity>, retry: boolean): Promise<RecursivePartial<ResetPassword>>;
    updateStatus(where: FindOptionsWhere<ResetPasswordEntity>, entity: RecursivePartial<ResetPasswordEntity>): Promise<boolean> ;
    removeResetPassword(id: string): Promise<RecursivePartial<ResetPassword>>;
}
