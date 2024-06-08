import { User } from "./user";
import { RecursivePartial } from "../type/recursive-partial.type";

export interface Auth {
    token: string,
    user: RecursivePartial<User>
}