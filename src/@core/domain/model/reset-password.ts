import { User } from "./user";
import { ResetPasswordStatus } from "../enum/reset-password-status.enum";

export class ResetPassword {
    id: string;
    user: User;
    status: ResetPasswordStatus;
    createdAt: Date;
    expiresAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
