import React from 'react'
import { supabase } from '../../common'
import { Heading } from '@chakra-ui/react'

import { TaskForm } from '../../components/tasks/TaskForm'
import Link from 'next/link'

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
