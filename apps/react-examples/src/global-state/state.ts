import type { CreateTask, Task, TaskFilter } from '@srtp/fake-tasks'
import { createTask } from '@srtp/fake-tasks'
import { toArray } from '@srtp/fn'
import type { Getter } from '@srtp/react'
import { atomWithHooks, useAction, useValue } from '@srtp/react'
import type { Draft } from 'immer'
import { atom } from 'jotai'

import type { State } from '@/initialTasks'
import { initialState } from '@/initialTasks'

const filterAtom = atom<TaskFilter>('All')

export const useFilterValue = () => {
  return useValue(filterAtom)
}

export const useUpdateFilter = () => {
  return useAction(filterAtom)
}

type TasksState = State['tasks']
const [tasksAtom, useTaskAction, useTaskValue] = atomWithHooks(
  initialState.tasks,
)

const createTaskAction = (draft: Draft<TasksState>, task: CreateTask) => {
  const created = createTask(task)
  draft.set(created.id, created)
}

export const useCreate = () => useTaskAction(createTaskAction)

export const useDelete = () =>
  useTaskAction((draft, id: number) => {
    draft.delete(id)
  })

export const useEdit = () =>
  useTaskAction((draft, task: Task) => {
    const editTask = draft.get(task.id)
    draft.set(task.id, { ...editTask, ...task })
  })

const toggle = (draft: Draft<TasksState>, id: number) => {
  const toggleTask = draft.get(id)
  if (toggleTask) {
    toggleTask.completed = !toggleTask.completed
  }
}

export const useToggle = () => useTaskAction(toggle)

const filtered = (get: Getter) => {
  const taskList = toArray(get(tasksAtom).values())
  const filter = get(filterAtom)

  return filter === 'All'
    ? taskList
    : filter === 'Completed'
    ? taskList.filter(t => t.completed)
    : taskList.filter(t => !t.completed)
}

// these hooks are to compute values, SHOULD NOT take any parameters
// Must always pass the same function to useTaskValue
export const useFilteredTasks = () => useTaskValue(filtered)
