import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import type { Task } from '../../common'
import { supabase } from '../../common'
import { Header, TaskList } from '../../components/tasks'

interface ListProps {
  readonly taskList: readonly Task[]
}

export const getServerSideProps: GetServerSideProps<ListProps> = async () => {
  const { data: taskList } = await supabase
    .from('tasks')
    .select(`id,title,description`)

  if (!taskList) {
    return {
      notFound: true,
    }
  }
  return { props: { taskList } }
}

const List: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ taskList }) => {
  const user = supabase.auth.user()

  return (
    <>
      <Header />
      {user && taskList && <TaskList list={taskList} />}
    </>
  )
}
export default List
