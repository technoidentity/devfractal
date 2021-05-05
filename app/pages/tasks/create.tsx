import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { supabase } from '../../common'
import { TaskForm } from '../../components/tasks'

const createTask = () => {
  const user = supabase.auth.user()

  if (user) {
    return <TaskForm />
  } else {
    return (
      <Heading>
        <Link href="/pre-interview">
          <a>Login to continue</a>
        </Link>
      </Heading>
    )
  }
}
export default createTask
