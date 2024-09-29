import passport from "passport";
import jwt, { ExtractJwt } from 'passport-jwt'
import { getJWTCookie } from "../utils.js";

const JWTStrategy = jwt.Strategy

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
        secretOrKey: process.env.SECRET
    }, (payload, done) => {
        try {
            return done(null, payload)
        } catch (error) {
            return done(e)
        }
    }))
}

export default initializePassport