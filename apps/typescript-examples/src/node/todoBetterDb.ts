import Database from 'better-sqlite3'

type Todo = Readonly<{
  id?: number | bigint
  title: string
  completed: boolean
}>

const db = new Database('todos.db')

export const createTodo = (todo: Todo): Todo => {
  const insert = db.prepare(
    "INSERT INTO todos (title, completed, createdAt, updatedAt) VALUES (@title, @completed, datetime('now'), datetime('now'))",
  )
  const result = insert.run(todo)
  return { id: result.lastInsertRowid, ...todo }
}

export const getTodos = () => {
  const select = db.prepare('SELECT * FROM todos')
  return select.all() as Todo[]
}

export const getTodoById = (id: number): Todo | null => {
  const select = db.prepare('SELECT * FROM todos WHERE id = ?')
  const result = select.get(id)
  return result ? (result as Todo) : null
}

export const updateTodo = (id: number, updates: Partial<Todo>): Todo | null => {
  const select = db.prepare('SELECT * FROM todos WHERE id = ?')
  const result = select.get(id)

  if (!result) {
    return null
  }

  const fields = Object.keys(updates)
    .map(key => `${key} = ?`)
    .join(', ')
  const values = Object.values(updates)

  const update = db.prepare(
    `UPDATE todos SET ${fields}, updatedAt = datetime('now') WHERE id = ?`,
  )
  update.run(...values, id)

  return { ...result, ...updates } as Todo
}

export const deleteTodo = (id: number): boolean => {
  const del = db.prepare('DELETE FROM todos WHERE id = ?')
  const result = del.run(id)
  return result.changes > 0
}
