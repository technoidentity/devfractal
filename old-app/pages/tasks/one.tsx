import { useRouter } from 'next/router'
import React from 'react'
import { supabase, Task } from '../../common'
import { Error, Header, OneTaskForm } from '../../components/tasks'

const One = () => {
  const user = supabase.auth.user()
  const router = useRouter()
  if (!router.query.data) {
    return <Error message="Parameters missing" />
  }
  const { id, title, description }: Task = JSON.parse(
    (router.query.data as any) as string,
  )

  const taskDetails = { id, title, description }
  return (
    <>
      <Header />
      {user && <OneTaskForm taskDetails={taskDetails} />}
    </>
  )
}
export default One
