import { FindOneOptions, FindOptionsSelect, FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { PaginationFilter } from "../../../../domain/dto/filter/paginationFilter";
import { omitUserPassword, toDomain, toDomainList } from "../../../utils/mapper/mapper.utils";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";
import { paginate } from "../../../utils/pagination/pagination";
import { ResetPasswordEntity } from "../entities/reset-password.entity";
import { ResetPasswordsRepository } from "../../../../domain/repository/reset-passwords.repository";
import { ResetPassword } from "../../../../domain/model/reset-password";

export class ResetPasswordsEntityRepository extends Repository<ResetPasswordEntity> implements ResetPasswordsRepository {


    constructor(
        @InjectRepository(ResetPasswordEntity) private repository: Repository<ResetPasswordEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getAllResetPasswords(): Promise<RecursivePartial<ResetPassword>[]> {
        const entities = await this.find()
        return toDomainList(entities);
    }

    async getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<ResetPassword>[], number ]> {
        const [ resetPasswords, total ] = await this.findAndCount(paginate(filter))
        return [ toDomainList(resetPasswords), total ];
    }

    async getResetPassword(options: FindOneOptions): Promise<RecursivePartial<ResetPassword>> {
        return toDomain(await this.findOne(options));
    }

    async createResetPassword(entityDto: RecursivePartial<ResetPasswordEntity>): Promise<RecursivePartial<ResetPassword>> {
        const entity = await this.save(entityDto);
        const resetPassword = { ...entity, user: omitUserPassword(entity.user) }
        return toDomain(resetPassword);
    }

    async updateStatus(where: FindOptionsWhere<ResetPasswordEntity>, entity: RecursivePartial<ResetPasswordEntity>): Promise<boolean> {
        const isUpdated = await this.update(where, entity);
        return !!isUpdated;
    }

    async removeResetPassword(id: string): Promise<RecursivePartial<ResetPassword>> {
        const entity: ResetPasswordEntity = await this.findOneBy({ id: id });
        await this.softRemove(entity);
        return toDomain(entity);
    }

}