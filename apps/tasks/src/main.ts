import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { teachers } from './db/schema'

const sqlite = new Database('file:sqlite.db')
const db = drizzle(sqlite)

db.insert(teachers).values({ email: 'foo@bar.com' }).run()

export const allUsers = db.select().from(teachers).all()
console.log(allUsers)
