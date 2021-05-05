import { Heading } from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import type { Task } from '../../common'
import { supabase } from '../../common'
import { TaskList } from '../../components/tasks'

interface DisplayTaskListProps {
  readonly taskList: readonly Task[]
}

export const getServerSideProps: GetServerSideProps<DisplayTaskListProps> = async () => {
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

const DisplayTaskList: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ taskList }) => {
  if (taskList) {
    return <TaskList list={taskList} />
  } else {
    return <Heading> Permission Denied</Heading>
  }
}

export default DisplayTaskList
