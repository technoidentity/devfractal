import type { LoaderArgs } from '@remix-run/server-runtime'
import { SpendSearchSpec } from '~/common'
import { safeQuery, sjson, useGet } from '~/core'
import { PeopleSpendList } from '~/features/spend'
import { getPeopleSpend } from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(SpendSearchSpec.partial(), args.request)
  const { personCost } = await getPeopleSpend(q)

  return sjson({ personCost })
}

const PeopleSpendPage = () => {
  const { personCost } = useGet<typeof loader>()

  return <PeopleSpendList personCost={personCost} />
}

export default PeopleSpendPage
