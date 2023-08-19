import { isDefined } from '@srtp/spec'
import sqlite3 from 'sqlite3'

type Todo = Readonly<{
  id?: number
  title: string
  completed: boolean
}>

const db: sqlite3.Database = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run(
    'CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, completed INTEGER)',
  )
})

export async function getTodos(
  limit: number = 10,
  page: number = 1,
  filter: string = '',
  completed: string | undefined = undefined,
): Promise<Todo[]> {
  const offset = (page - 1) * limit
  const filterQuery = filter !== '' ? `WHERE title LIKE '%${filter}%'` : ''
  const completedQuery = isDefined(completed)
    ? `AND completed = ${completed === 'true' ? 1 : 0}`
    : ''
  const query = `SELECT * FROM todos ${filterQuery} ${completedQuery} LIMIT ${limit} OFFSET ${offset}`

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows as Todo[])
      }
    })
  })
}

export async function createTodo(
  title: string,
  completed: boolean,
): Promise<Todo> {
  const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)'
  const params = [title, completed ? 1 : 0]
  return new Promise<Todo>(function (resolve, reject) {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          // eslint-disable-next-line no-invalid-this
          id: this.lastID,
          title,
          completed,
        })
      }
    })
  })
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean,
): Promise<Todo> {
  const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?'
  const params = [title, completed ? 1 : 0, id]
  return new Promise<Todo>((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          id,
          title,
          completed,
        })
      }
    })
  })
}

export async function deleteTodo(id: number): Promise<void> {
  const query = 'DELETE FROM todos WHERE id = ?'
  return new Promise<void>((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
