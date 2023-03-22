var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { db } from './assets/db';
const { DOOR } = process.env;
passport.use(new passportJWT.Strategy({
    secretOrKey: DOOR,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = db.one(`SELECT * FROM users WHERE id=$1`, payload.id);
    console.log(user);
    try {
        return user ? done(null, user) : done(new Error('User not found.'));
    }
    catch (error) {
        done(error);
    }
})));
