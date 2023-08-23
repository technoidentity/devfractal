/* eslint-disable @typescript-eslint/naming-convention */
import { tree } from '@srtp/react'

type Todo = {
  id: number
  title: string
  completed: boolean
}

type TodosState = {
  todos: Todo[]
  loading: boolean
  addTodoLoading: boolean
  removeTodoLoading: boolean
  toggleTodoLoading: boolean
  error: string | undefined
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  addTodoLoading: false,
  removeTodoLoading: false,
  toggleTodoLoading: false,
  error: undefined,
}

export const { Provider, useDispatch, actions } = tree(initialState, {
  FETCH_TODOS_REQUEST: state => {
    state.loading = true
    state.error = undefined
  },

  FETCH_TODOS_SUCCESS: (state, payload: Todo[]) => {
    state.todos = payload
    state.loading = false
    state.error = undefined
  },

  FETCH_TODOS_FAILURE: (state, payload: string) => {
    state.loading = false
    state.error = payload
  },

  ADD_TODO: state => {
    state.addTodoLoading = true
  },

  ADD_TODO_SUCCESS: (state, payload: Todo) => {
    state.todos.push(payload)
    state.addTodoLoading = false
  },

  ADD_TODO_FAILURE: (state, payload: string) => {
    state.addTodoLoading = false
    state.error = payload
  },

  REMOVE_TODO: state => {
    state.removeTodoLoading = true
  },

  REMOVE_TODO_SUCCESS: (state, payload: number) => {
    state.todos = state.todos.filter(todo => todo.id !== payload)
    state.removeTodoLoading = false
  },

  REMOVE_TODO_FAILURE: (state, payload: string) => {
    state.removeTodoLoading = false
    state.error = payload
  },

  TOGGLE_TODO: state => {
    state.toggleTodoLoading = true
  },

  TOGGLE_TODO_SUCCESS: (state, payload: number) => {
    const todo = state.todos.find(todo => todo.id === payload)
    if (todo) {
      todo.completed = !todo?.completed
    }
    state.toggleTodoLoading = false
  },

  TOGGLE_TODO_FAILURE: (state, payload: string) => {
    state.toggleTodoLoading = false
    state.error = payload
  },
})

// const api = (
//   path: RequestInfo,
//   options?: Omit<RequestInit, 'body'> & { body?: any },
// ) => {
//   if (options?.method !== 'GET') {
//     options = {
//       ...options,
//       body: options?.body && JSON.stringify(options?.body),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   }

//   return fetch(path, options).then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to fetch Todos')
//     }
//     return response.json()
//   })
// }

// async function useApiDispatch(type: string, fn: () => Promise<any>) {
//   const dispatch = useDispatch()

//   dispatch({ type })
//   try {
//     dispatch({ type: `${type}_SUCCESS`, payload: await fn() })
//   } catch (error) {
//     invariant(error instanceof Error)
//     dispatch({ type: `${type}_FAILURE`, payload: error.message })
//   }
// }

// export const fetchTodos = () => async () =>
//   useApiDispatch('FETCH_TODOS', async () =>
//     api('/api/todos', { method: 'GET' }),
//   )

// export const addTodo = (title: string) => async () =>
//   useApiDispatch('ADD_TODO', async () =>
//     api('/api/todos', { method: 'POST', body: { title } }),
//   )

// export const removeTodo = (id: number) => async () =>
//   useApiDispatch('REMOVE_TODO', async () => {
//     await api(`/api/todos/${id}`, { method: 'DELETE' })
//     return id
//   })

// export const toggleTodo = (id: number, completed: boolean) => async () =>
//   useApiDispatch('TOGGLE_TODO', async () =>
//     api(`/api/todos/${id}`, { method: 'PATCH', body: { completed } }),
//   )
