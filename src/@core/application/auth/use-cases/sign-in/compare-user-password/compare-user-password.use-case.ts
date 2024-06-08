import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from "bcrypt";

@Injectable()
export class CompareUserPassword {

    async compare(dbPassword: string, authPassword: string) {
        const correctPassword = await bcrypt.compare(authPassword, dbPassword);
        if (!correctPassword) {
            throw new UnauthorizedException("Email ou senha incorretos!");
        }
    }

}
