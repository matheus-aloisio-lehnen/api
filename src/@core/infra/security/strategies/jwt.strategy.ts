import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { JWT_OPENING_CONFIG } from "../../config/jwt.config";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super(JWT_OPENING_CONFIG);
    }

    validate(jwt: any) {
        return jwt;
    }

}