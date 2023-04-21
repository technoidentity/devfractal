import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { students } from './src/db/schema'

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

db.insert(students).values([{ name: 'John', email: 'john@gmail.com' },
  { name: 'Jane', email: 'jane@gmail.com' }]).run()

