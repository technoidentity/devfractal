import type { LoaderArgs } from '@remix-run/server-runtime'
import { sjson, useGet } from '~/common'
import { PeopleSpendList } from '~/components/spend'
import { getPeopleSpend } from '~/models'

export async function loader(_: LoaderArgs) {
  const { personCost } = await getPeopleSpend()

  return sjson({ personCost })
}

const PeopleSpendPage = () => {
  const { personCost } = useGet<typeof loader>()

  return <PeopleSpendList personCost={personCost} />
}

export default PeopleSpendPage
