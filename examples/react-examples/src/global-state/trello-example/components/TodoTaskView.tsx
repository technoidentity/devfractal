import { state } from '@srtp/react'
import { useAtom } from 'jotai'
import { draggedTaskAtom } from '../state'

type TodoTaskProps = {
  todoList: string[]
  onAddTask: (task: string) => void
}

const useInput = state(
  { task: '' },
  {
    addTask(draft, text: string) {
      draft.task = text
    },
  },
)

export function TodoTaskView({
  todoList,
  onAddTask,
}: TodoTaskProps): JSX.Element {
  const [_, setDraggedTask] = useAtom(draggedTaskAtom)
  const [input, actions] = useInput()

  return (
    <main className="flex w-full flex-col text-black">
      <h1 className="rounded-md bg-gray-300 p-4 text-center text-2xl font-bold text-white">
        Todo
      </h1>
      <section className="space-y-2 overflow-auto bg-white p-2">
        {todoList.length > 0 ? (
          todoList.map(task => (
            <p
              key={task}
              className="cursor-move break-words rounded-xl border-2 px-4 py-2 shadow-md"
              draggable
              onDragStart={() => setDraggedTask(task)}
            >
              {task}
            </p>
          ))
        ) : (
          <p className="text-center">Nothing yet...</p>
        )}
      </section>

      <section className="flex justify-between gap-x-2 bg-gray-300 px-2 py-4">
        <input
          type="text"
          name="new-task"
          id="task"
          onChange={e => actions.addTask(e.target.value)}
          value={input.task}
          placeholder="Add Task"
          autoFocus
          className="w-[80%] rounded-xl border-2 px-2"
        />
        <button
          className=" rounded-xl border bg-white px-4 py-1 text-center font-bold"
          onClick={() => {
            onAddTask(input.task)
            actions.addTask('')
          }}
        >
          Add
        </button>
      </section>
    </main>
  )
}
