import { Role } from "../enum/role.enum";
import { PersonalData } from './personal-data';
import { Address } from "./address";
import { Account } from "./account";
import { Log } from "./log";
import { ResetPassword } from "./reset-password";

export class User {
    id: number;
    email: string;
    password?: string;
    role: Role
    status: boolean;
    account: Account;
    personalData: PersonalData;
    address: Address;
    logs: Log[];
    resetPasswords: ResetPassword[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
