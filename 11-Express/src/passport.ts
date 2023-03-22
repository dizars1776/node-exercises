import * as dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import passportJWT from 'passport-jwt'
import { db } from './assets/db'

const { DOOR } = process.env

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: DOOR,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = db.one(`SELECT * FROM users WHERE id=$1`, payload.id)
      console.log(user)

      try {
        return user ? done(null, user) : done(new Error('User not found.'))
      } catch (error) {
        done(error)
      }
    }
  )
)
