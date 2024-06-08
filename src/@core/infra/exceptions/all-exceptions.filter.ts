import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { LogEntity } from "../database/type-orm/entities/log.entity";
import { LogService } from "../observability/log/service/log.service";
import { RecursivePartial } from "../../domain/type/recursive-partial.type";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    constructor(
        private logService: LogService
    ) {
    }

    async catch(exception: unknown, host: ArgumentsHost) {
        console.log(exception)
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let status = 500;
        let message = 'Erro inesperado';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            if (typeof exception.getResponse === 'function') {
                const exceptionResponse: any = exception.getResponse();
                message = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message;
            }
        }

        const { password, ...body } = request.body;
        const logEntity: RecursivePartial<LogEntity> = {
            ipAddress: request.ip,
            userAgent: request.headers["user-agent"],
            method: request.method,
            endpoint: request.url,
            payload: JSON.stringify(body),
            message: message,
            statusCode: status
        }

        await this.logService.handleLog(logEntity)

        return response
            .status(logEntity.statusCode)
            .json({
                logId: logEntity.id,
                statusCode: logEntity.statusCode,
                timestamp: logEntity.createdAt,
                path: logEntity.endpoint,
                message: logEntity.message
            });
    }

}