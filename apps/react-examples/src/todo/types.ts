export type Todo = Readonly<{ id: number; text: string; completed: boolean }>

export type Filter = 'All' | 'Active' | 'Completed'

export type TodoAction =
  | Readonly<{ type: 'ADD_TODO'; text: string }>
  | Readonly<{ type: 'TOGGLE_TODO'; id: number }>
  | Readonly<{ type: 'SET_FILTER'; filter: Filter }>

export type TodoState = Readonly<{ todoList: readonly Todo[]; filter: Filter }>
