import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullName: text('full_name'),
})

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

export const allUsers = db.select().from(users).all()
