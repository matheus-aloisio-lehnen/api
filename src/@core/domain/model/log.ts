import { User } from "./user";

export class Log {
    id?: number;
    ipAddress: string;
    userAgent: string;
    method: string;
    endpoint: string;
    payload: string;
    context: string;
    actionType: string;
    message: string;
    statusCode: number;
    user: User;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
