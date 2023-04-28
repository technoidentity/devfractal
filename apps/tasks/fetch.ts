import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { students } from './src/db/schema'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

const allStudents = db.select().from(students).all()

console.log(allStudents)
