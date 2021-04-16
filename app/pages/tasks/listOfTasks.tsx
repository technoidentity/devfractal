import React from 'react'
import useSWR from 'swr'
import type { Task } from '../../common'
import { TaskList } from '../../components/tasks'

const fetcher = async (url: string) => fetch(url).then(async res => res.json())

const ListOfTasks = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR('/api/tasks/tasks', fetcher)

  if (error) {
    return <div>failed to load</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }
  return <TaskList list={data as readonly Task[]} />
}

export default ListOfTasks
