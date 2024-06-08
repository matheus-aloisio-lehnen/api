import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { logger } from "./db-log.config";
require("dotenv").config();

export const DATASOURCE_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: !!process.env.DB_SYNC,
    entities: [ `${ __dirname }/../database/type-orm/entities/*.entity{.ts,.js}` ],
    // logger: logger
}