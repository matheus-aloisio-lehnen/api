import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, response } from "express";

import { LogEntity } from "../../../database/type-orm/entities/log.entity";
import { tap } from "rxjs";
import { LogService } from "../service/log.service";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";

@Injectable()
export class LogInterceptor implements NestInterceptor {

    constructor(
        private logService: LogService
    ) {
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const { password, ...filteredPayload } = request.body;
        const logEntity: RecursivePartial<LogEntity> = {
            ipAddress: request.ip,
            userAgent: request.headers["user-agent"],
            method: request.method,
            endpoint: request.url,
            payload: JSON.stringify(filteredPayload),
            context: context.getClass().name,
            actionType: context.getHandler().name,
        }
        await this.logService.handleLog(logEntity);

        return next.handle()
            .pipe(tap(() => {
                const logEntity: RecursivePartial<LogEntity> = { statusCode: response.statusCode, message: response.statusMessage }
                this.logService.handleLog(logEntity)
            }),
        );
    }

}
