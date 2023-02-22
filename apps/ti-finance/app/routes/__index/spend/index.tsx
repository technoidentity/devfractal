import type { LoaderArgs } from '@remix-run/server-runtime'
import { PeopleSpendList, SpendSearchSpec } from '~/features/spend'
import { safeQuery, sjson, useGet } from '~/core'
import { getPeopleSpend } from '~/models'

const getWhere = (request: LoaderArgs['request']) => {
  const q = safeQuery(SpendSearchSpec.partial(), request)
  const fromDate = { gte: q.dateRange?.[0] ?? undefined }
  const toDate = { lte: q.dateRange?.[1] ?? undefined }
  return {
    tiId: q.tiId,
    fromDate,
    toDate,
  }
}

export async function loader(args: LoaderArgs) {
  const where = getWhere(args.request)
  const { personCost } = await getPeopleSpend(where)

  return sjson({ personCost })
}

const PeopleSpendPage = () => {
  const { personCost } = useGet<typeof loader>()

  return <PeopleSpendList personCost={personCost} />
}

export default PeopleSpendPage
