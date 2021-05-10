import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { supabase } from '../../common'
import { Header, TaskForm } from '../../components/tasks'

const Create = () => {
  const user = supabase.auth.user()

  if (user) {
    return (
      <>
        <Header />
        <TaskForm />
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
export default Create
