import { filterTodos } from '../filterTodos'
import type { TodoAction, TodoState } from '../types'

import { AddTodo } from './AddTodo'
import { FilterView } from './Filter'
import { TodoList } from './TodoList'

export type TodoAppProps = Readonly<{
  state: TodoState
  dispatch: React.Dispatch<TodoAction>
}>

export const TodoApp = ({ state, dispatch }: TodoAppProps) => {
  const filtered = filterTodos(state.tasks, state.filter)

  return (
    <>
      <FilterView
        value={state.filter}
        onFilterChange={filter => {
          dispatch({ type: 'SET_FILTER', filter })
        }}
      />

      <AddTodo
        onAdd={text => {
          dispatch({ type: 'ADD_TODO', text })
        }}
      />

      <TodoList
        todos={filtered}
        onToggle={id => {
          dispatch({ type: 'TOGGLE_TODO', id })
        }}
      />
    </>
  )
}
