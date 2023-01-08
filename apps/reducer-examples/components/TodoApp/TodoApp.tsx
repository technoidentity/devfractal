import { Provider } from './state'
import { TodoList } from './TodoList'

export const TodoApp = () => (
  <Provider>
    <TodoList />
  </Provider>
)
