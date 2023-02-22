import type { LoaderArgs } from '@remix-run/server-runtime'
import { AppProvider } from '~/common'
import { AppIntroPage, HomePage } from '~/features/app'
import { SignedIn, SignedOut, sjson, useGet } from '~/core'

import { prisma } from '~/db.server'

export async function loader(_: LoaderArgs) {
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
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
