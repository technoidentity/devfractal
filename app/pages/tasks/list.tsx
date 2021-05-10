import { Heading } from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
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

  if (user && taskList) {
    return (
      <>
        <Header />
        <TaskList list={taskList} />
      </>
    )
  } else {
    return (
      <Heading>
        <Link href="/tasks">
          <a>Login to continue</a>
        </Link>
      </Heading>
    )
  }
}

export default List
