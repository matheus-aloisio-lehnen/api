import { ExtractJwt } from "passport-jwt";
require("dotenv").config();

export const JWT_CONFIG = {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_TIME || '24h' }
}

export const JWT_OPENING_CONFIG = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: !!process.env.JWT_IGNORE_EXPIRATION || false,
    secretOrKey: process.env.JWT_SECRET
}
