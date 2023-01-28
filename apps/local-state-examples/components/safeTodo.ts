import { action, actions, tree$, safeReducer } from '@srtp/local-state'
import { createTodo, CreateTodo, initialState, State, Todo } from '@srtp/todo'
import { z } from 'zod'

const TodoAction = actions([
  action('createTodo', CreateTodo),
  action('deleteTodo', z.number()),
  action('toggleTodo', z.number()),
  action('editTodo', Todo),
])

export type TodoAction = Readonly<z.infer<typeof TodoAction>>

export const todoReducer = safeReducer(
  State,
  TodoAction,
)({
  createTodo(state, payload) {
    const created = createTodo(payload)
    state.todos.set(created.id, created)
  },

  deleteTodo(state, payload) {
    state.todos.delete(payload)
  },

  editTodo(state, payload) {
    const editTodo = state.todos.get(payload.id)
    state.todos.set(payload.id, { ...editTodo, ...payload })
  },

  toggleTodo(state, payload) {
    const toggleTodo = state.todos.get(payload)
    if (toggleTodo) {
      toggleTodo.completed = !toggleTodo.completed
    }
  },
})

export const { Provider, useDispatch, useSelect, useValue } = tree$(
  initialState,
  todoReducer,
)
