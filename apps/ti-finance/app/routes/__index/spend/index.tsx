import type { LoaderArgs } from '@remix-run/server-runtime'
import { safeQuery } from '@srtp/remix-node'
import { sjson, useGet } from '~/common'
import { PeopleSpendList, SpendFiltersSpec } from '~/components/spend'
import { getPeopleSpend } from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(SpendFiltersSpec.partial(), args.request)
  const fromDate = { gte: q.dateRange?.[0] ?? undefined }
  const toDate = { lte: q.dateRange?.[1] ?? undefined }

  const { personCost } = await getPeopleSpend({
    tiId: q.tiId,
    fromDate,
    toDate,
  })

  return sjson({ personCost })
}

const PeopleSpendPage = () => {
  const { personCost } = useGet<typeof loader>()

  return <PeopleSpendList personCost={personCost} />
}

export default PeopleSpendPage
