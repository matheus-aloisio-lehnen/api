import { INestApplication, INestMicroservice } from "@nestjs/common";
import { AllExceptionsFilter } from "../exceptions/all-exceptions.filter";
import { LogService } from "../observability/log/service/log.service";

export const configureGlobalFilters = (app: INestApplication | INestMicroservice) => {
    const logsService: LogService = app.get<LogService>(LogService);
    app.useGlobalFilters(new AllExceptionsFilter(logsService));
}
