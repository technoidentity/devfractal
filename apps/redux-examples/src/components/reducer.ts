import type { Draft } from 'immer'
import { produce } from 'immer'
import { z } from 'zod'
import type { Infer } from '@srtp/core'
import { cast, strict } from '@srtp/core'
import type { State } from '@srtp/todo'
import { CreateTodo, createTodo, Todo } from '@srtp/todo'

export const Action = z.union([
  strict({ type: z.literal('createTodo'), todo: CreateTodo }),
  strict({ type: z.literal('deleteTodo'), id: z.number() }),
  strict({ type: z.literal('toggleTodo'), id: z.number() }),
  strict({ type: z.literal('editTodo'), todo: Todo }),
])

export type Action = Infer<typeof Action>

export const todoReducer = produce((draft: Draft<State>, action: Action) => {
  action = cast(Action, action)

  switch (action.type) {
    case 'createTodo':
      const created = createTodo(action.todo)
      draft.todos.set(created.id, created)
      break

    case 'deleteTodo':
      draft.todos.delete(action.id)
      break

    case 'editTodo':
      const editTodo = draft.todos.get(action.todo.id)
      draft.todos.set(action.todo.id, { ...editTodo, ...action.todo })
      break

    case 'toggleTodo':
      const toggleTodo = draft.todos.get(action.id)
      if (toggleTodo) {
        toggleTodo.completed = !toggleTodo.completed
      }
  }
})
