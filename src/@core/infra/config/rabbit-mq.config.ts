import { RmqOptions, Transport } from "@nestjs/microservices";
require("dotenv").config();

export const RABBIT_MQ_CONFIG: RmqOptions = {
    transport: Transport.RMQ,
    options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'notifications_queue',
        queueOptions: {
            durable: false,
        },
    },
}

