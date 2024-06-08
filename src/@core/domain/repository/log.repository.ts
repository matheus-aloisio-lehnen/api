import { PaginationFilter } from "../dto/filter/paginationFilter";
import { Log } from "../model/log";
import { LogEntity } from "../../infra/database/type-orm/entities/log.entity";
import { RecursivePartial } from "../type/recursive-partial.type";

export interface LogRepository {
    getAllLogs(): Promise<RecursivePartial<Log>[]>;
    getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<Log>[], number ]>;
    getLogById(id: number): Promise<RecursivePartial<Log>>;
    getLogsByUserId(id: number): Promise<RecursivePartial<Log>>;
    createLog(logEntity: LogEntity): Promise<RecursivePartial<Log>>;
    updateLog(id: number, logEntity: RecursivePartial<LogEntity>): Promise<RecursivePartial<Log>>;
}
