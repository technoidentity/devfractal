import { state } from 'devfractal'
import { CompletedTaskView } from './components/CompletedTaskView'
import { OngoingTaskView } from './components/OngoingTaskView'
import { TodoTaskView } from './components/TodoTaskView'
import { initialState } from './state'

const useDraggable = state(initialState, {
  addTodos(draft, task: string) {
    if (!task) {
      return
    }
    if (draft.todos.includes(task)) {
      return
    }
    draft.todos.push(task)
  },

  addToOngoing(draft, task: string) {
    if (draft.ongoing.includes(task)) {
      return
    }
    draft.ongoing.unshift(task)

    draft.todos.splice(draft.todos.indexOf(task), 1)
  },

  addToCompleted(draft, task: string) {
    if (draft.completed.includes(task)) {
      return
    }
    draft.completed.unshift(task)

    draft.ongoing.splice(draft.ongoing.indexOf(task), 1)
    draft.todos.splice(draft.todos.indexOf(task))
  },
})
export function DragDropApp(): JSX.Element {
  const [state, actions] = useDraggable()

  return (
    <main className="flex h-screen gap-x-4 bg-blue-200 px-4 py-2">
      <TodoTaskView todoList={state.todos} onAddTask={actions.addTodos} />
      <OngoingTaskView
        ongoingList={state.ongoing}
        onDrop={actions.addToOngoing}
      />

      <CompletedTaskView
        completedList={state.completed}
        onDrop={actions.addToCompleted}
      />
    </main>
  )
}
