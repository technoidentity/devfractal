import { AppProvider } from '~/common'
import { SignedIn, SignedOut } from '~/core'
import { AppIntroPage, HomePage } from '~/features/app'

import { sjson } from '@srtp/remix-node'
import { useGet } from '@srtp/remix-react'
import { prisma } from '~/db.server'

export async function loader() {
  const users = await prisma.user.findMany({
    select: { tiId: true, username: true },
  })

  const departments = await prisma.department.findMany({
    select: { id: true, name: true },
  })

  return sjson({ users, departments })
}

export default function Index() {
  const { departments, users } = useGet<typeof loader>()

  return (
    <>
      <SignedIn>
        <AppProvider departments={departments} users={users}>
          <HomePage />
        </AppProvider>
      </SignedIn>
      <SignedOut>
        <AppIntroPage />
      </SignedOut>
    </>
  )
}
