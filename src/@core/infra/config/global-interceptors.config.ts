import { INestApplication, INestMicroservice } from "@nestjs/common";
import { LogInterceptor } from "../observability/log/interceptor/log.interceptor";
import { LogService } from "../observability/log/service/log.service";

export const configureGlobalInterceptors = (app: INestApplication | INestMicroservice) => {
    const logsService: LogService = app.get<LogService>(LogService);
    app.useGlobalInterceptors(new LogInterceptor(logsService))

}
