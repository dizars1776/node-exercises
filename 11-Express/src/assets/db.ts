import pgPromise from 'pg-promise'
import { readFileSync } from 'fs'

const db = pgPromise()('postgres://postgres:postgres@localhost:5432/planets')

// inits the database - planets - and adds 2 planets
const setupDb = async () => {
  const initSql = readFileSync('./src/assets/14.sql').toString()
  await db.query(initSql)
}

setupDb()

export { db }
