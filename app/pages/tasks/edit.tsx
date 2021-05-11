import { useRouter } from 'next/router'
import React from 'react'
import type { Task } from '../../common'
import { supabase } from '../../common'
import { EditForm, Error, Header } from '../../components/tasks'

const Edit = () => {
  const user = supabase.auth.user()

  const router = useRouter()

  if (!router.query.data) {
    return <Error message="parameters missing" />
  }
  const { id, title, description }: Task = JSON.parse(
    (router.query.data as any) as string,
  )

  const taskDetails: Task = { id, title, description }
  return (
    <>
      <Header />
      {user && <EditForm taskDetails={taskDetails} />}
    </>
  )
}

export default Edit
