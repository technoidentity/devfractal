import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import type { Task } from '../../common'
import { EditForm, Error, Header } from '../../components/tasks'

const Edit = () => {
  const user = useUser()

  const router = useRouter()

  if (!router.query.data) {
    return <Error message="parameters missing" />
  }
  const { id, title, description }: Task = JSON.parse(
    router.query.data as any as string,
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
