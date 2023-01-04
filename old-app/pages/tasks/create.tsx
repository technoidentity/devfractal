import React from 'react'
import { supabase } from '../../common'
import { CreateTaskForm, Header } from '../../components/tasks'

const Create = () => {
  const user = supabase.auth.user()

  return (
    <>
      <Header />
      {user && <CreateTaskForm />}
    </>
  )
}

export default Create
