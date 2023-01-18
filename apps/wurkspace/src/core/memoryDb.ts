import { orderBy as orderByFn, pick as pickFn } from '@srtp/fn'
import { produce } from 'immer'

type ManyParams<
  ID extends string | number,
  T extends { id: ID } & object,
> = Partial<{
  pick: readonly (keyof T)[]
  orderBy: keyof T
  order: 'asc' | 'desc'
  limit: number
  offset: number
  // filter: { [K in keyof T]: FilterParams<T[K]> }
}>

export type DB<
  ID extends string | number,
  T extends {
    id: ID
  },
> = {
  count(): number
  getAll(): readonly T[]
  getMany(params: ManyParams<ID, T>): readonly Partial<T>[]
  getOne(id: ID): T | undefined
  add(row: Omit<T, 'id'>): T | undefined
  update(id: ID, row: Partial<Omit<T, 'id'>>): T | undefined
  replace(id: ID, todo: T): T | undefined
  remove(id: ID): T | undefined
}

export function db<ID extends string | number, T extends { id: ID }>(
  rows: readonly T[],
  nextID: () => ID,
): DB<ID, T> {
  let db = rows

  const count = () => db.length

  const getAll = () => db

  const getOne = (id: ID) => {
    const idx = db.findIndex(c => c.id === id)
    return idx === -1 ? undefined : db[idx]
  }

  const getMany = ({
    pick,
    limit,
    offset,
    order,
    orderBy,
  }: ManyParams<ID, T>) => {
    let result = db as T[]

    if (orderBy !== undefined) {
      result = [...db]
      orderByFn(result, orderBy)

      if (order === 'desc') {
        result.reverse()
      }
    }

    if (offset) {
      result = result.slice(offset)
    }

    if (limit) {
      result = result.slice(0, limit)
    }

    return pick ? result.map(c => pickFn(c, pick)) : result
  }

  const add = (row: Omit<T, 'id'>) => {
    const newTodo = { id: nextID(), ...row }

    db = produce(db, draft => {
      draft.push(newTodo as any)
    })

    return newTodo as T
  }

  const update = (id: ID, row: Partial<Omit<T, 'id'>>) => {
    const idx = db.findIndex(c => c.id === id)
    if (idx === -1) {
      return undefined
    }

    const updated = { ...db[idx], ...row }

    db = produce(db, draft => {
      draft[idx] = updated as any
    })

    return updated
  }

  const replace = (id: ID, todo: T) => {
    if (id !== todo.id) {
      return undefined
    }

    const idx = db.findIndex(c => c.id === id)
    if (idx === -1) {
      return undefined
    }

    db = produce(db, draft => {
      draft[idx] = todo as any
    })

    return todo
  }

  const remove = (id: ID) => {
    const idx = db.findIndex(c => c.id === id)
    if (idx === -1) {
      return undefined
    }

    const removed = db[idx]

    db = produce(db, draft => {
      draft.splice(idx, 1)
    })
    return removed
  }

  return { count, getAll, getMany, getOne, add, update, replace, remove }
}
