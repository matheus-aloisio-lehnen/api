import { Injectable } from "@nestjs/common";

import { LogEntity } from "../../../database/type-orm/entities/log.entity";
import { Log } from "../../../../domain/model/log";
import { PaginationFilter } from "../../../../domain/dto/filter/paginationFilter";
import { LogEntityRepository } from "../../../database/type-orm/repository/log-entity.repository";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";

@Injectable()
export class LogService {


    public lastInsertedId: number | undefined;

    constructor(
        private repository: LogEntityRepository,
    ) {
    }

    async getAllLogs(): Promise<RecursivePartial<Log>[]> {
        return await this.repository.getAllLogs();
    }

    async handleLog(logEntity: RecursivePartial<LogEntity>): Promise<RecursivePartial<Log>> {

        const log = !this.lastInsertedId
            ? await this.createLog(logEntity)
            : await this.updateLog(this.lastInsertedId, logEntity)
        this.lastInsertedId = log.id;
        return log;
    }

    async createLog(logEntity: RecursivePartial<LogEntity>): Promise<RecursivePartial<Log>> {
        return await this.repository.createLog(logEntity);
    }

    async updateLog(id: number, logEntity: RecursivePartial<LogEntity>): Promise<RecursivePartial<Log>> {
        const updatedLog = await this.repository.updateLog(id, logEntity);
        this.lastInsertedId = undefined;
        return updatedLog;
    }

    async getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<Log>[], number ]> {
        return await this.repository.getAllPaginated(filter);
    }

    async getLogById(id: number): Promise<RecursivePartial<Log>> {
        return await this.repository.getLogById(id);
    }

    async getLogsByUserId(id: number): Promise<RecursivePartial<Log>> {
        return await this.repository.getLogsByUserId(id);
    }

}