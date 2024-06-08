import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationFilter } from "../../../../domain/dto/filter/paginationFilter";
import { LogEntity } from "../entities/log.entity";
import { LogRepository } from "../../../../domain/repository/log.repository";
import { Log } from "../../../../domain/model/log";
import { toDomain, toDomainList } from "../../../utils/mapper/mapper.utils";
import { paginate } from "../../../utils/pagination/pagination";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";


@Injectable()
export class LogEntityRepository extends Repository<LogEntity> implements LogRepository {


    constructor(
        @InjectRepository(LogEntity) repository: Repository<LogEntity>
       ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getAllLogs(): Promise<RecursivePartial<Log>[]> {
        const entities = await this.find()
        return toDomainList(entities);
    }

    async getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<Log>[], number ]> {
        const [entities, total] = await this.findAndCount(paginate(filter))
        return [toDomainList(entities), total];
    }

    async getLogById(id: number): Promise<RecursivePartial<Log>> {
        const log = await this.findOne({ where: { id: id } });
        return log ? toDomain(log) : null;
    }

    async getLogsByUserId(id: number): Promise<RecursivePartial<Log>> {
        return toDomain(await this.findOne({ where: { id: id } }));
    }

    async createLog(logEntity: RecursivePartial<LogEntity>): Promise<RecursivePartial<Log>> {
        return toDomain(await this.save(logEntity));
    }

    async updateLog(id: number, entity: RecursivePartial<LogEntity>): Promise<RecursivePartial<Log>> {
        await this.update(id, entity)
        return await this.getLogById(id);
    }

}