import { epRouter, type SEpsHandlers } from './epRouter'
import { throwBadRequest } from './errors'
import { createTodo, deleteTodo, Todo, todoList, updateTodo } from './todoDb'
import { todoEndpoints } from './todoEndpoints'

const todoHandlers = {
  getTodos: ({ request: filters }) => todoList(filters),

  removeTodo: ({ params: { id } }) => deleteTodo(id),

  addTodo: ({ request: body }): Todo => {
    const todo = createTodo(body)
    if (!todo) {
      throwBadRequest('todo not found')
    }

    return todo
  },

  updateTodo: ({ params: { id }, request: body }): Todo => {
    const todo = updateTodo(id, body)
    if (!todo) {
      throwBadRequest('todo not found')
    }

    return todo
  },
} satisfies SEpsHandlers<typeof todoEndpoints>

export const todoApp = epRouter(todoEndpoints, todoHandlers)
