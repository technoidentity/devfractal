import { useUser } from '@supabase/auth-helpers-react'
import { CreateTaskForm, Header } from '../../components/tasks'

const Create = () => {
  const user = useUser()

  return (
    <>
      <Header />
      {user && <CreateTaskForm />}
    </>
  )
}

export default Create
