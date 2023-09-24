import { Title } from '@mantine/core'
import type { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { sjson } from '@srtp/remix-node'
import { useGet } from '@srtp/remix-react'
import { SpendSearchSpec } from '~/common'
import { safeQuery } from '~/core'
import { PeopleSpendList } from '~/features/spend'
import { getPeopleSpend } from '~/models'

export async function loader(args: LoaderFunctionArgs) {
  const q = safeQuery(SpendSearchSpec, args.request)
  const { personCost } = await getPeopleSpend(q)

  return sjson({ personCost })
}

const PeopleSpendPage = () => {
  const { personCost } = useGet<typeof loader>()

  return (
    <>
      <Title order={3} mb="xl">
        View People Spend
      </Title>
      <PeopleSpendList personCost={personCost} />
    </>
  )
}

export default PeopleSpendPage
