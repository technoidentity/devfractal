import { ReducerProvider } from './Context'
import { TodoList } from './TodoList'

export const TodoApp = () => {
  return (
    <ReducerProvider>
      <TodoList />
    </ReducerProvider>
  )
}
