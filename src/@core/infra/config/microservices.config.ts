import { ClientsModuleOptions, Transport } from "@nestjs/microservices";
require("dotenv").config();

export const NOTIFICATION_MICROSERVICE = 'NOTIFICATION_MICROSERVICE'

export const MICROSERVICES_CONFIG: ClientsModuleOptions = [
    {
        name: NOTIFICATION_MICROSERVICE,
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: 'notifications_queue',
            queueOptions: {
                durable: false
            },
        },
    },
]