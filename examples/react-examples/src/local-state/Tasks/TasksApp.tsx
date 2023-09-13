import { Provider } from './state'
import { TaskList } from './TaskList'

export const TasksApp = () => (
  <Provider>
    <TaskList />
  </Provider>
)
