import { useAtom } from 'jotai'

import { draggedTaskAtom } from '../state'

type OngoingTaskProps = {
  ongoingList: string[]
  onDrop: (task: string) => void
}

export function OngoingTaskView({
  ongoingList,
  onDrop,
}: OngoingTaskProps): JSX.Element {
  const [draggedTask, setDraggedTask] = useAtom(draggedTaskAtom)

  return (
    <main
      className="flex h-[98vh] w-full flex-col text-black"
      onDragOver={e => e.preventDefault()}
      onDrop={() => {
        onDrop(draggedTask)
        setDraggedTask('')
      }}
    >
      <h1 className="rounded-md bg-gray-300 p-4 text-center text-2xl font-bold  text-white">
        Ongoing
      </h1>

      <section className="max-h-[90vh] space-y-2 overflow-auto bg-white p-2">
        {ongoingList.length > 0 ? (
          ongoingList.map(task => (
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
          <p className="text-center ">Nothing yet...</p>
        )}
      </section>
    </main>
  )
}
