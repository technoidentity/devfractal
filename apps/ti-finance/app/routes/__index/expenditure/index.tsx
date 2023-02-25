import { Title } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { ExpenditureSearchSpec, ExpenditureSpec, IntId } from '~/common'
import { safeQuery, sjson, useGet } from '~/core'
import { ExpenditureList } from '~/features/expenditure'
import {
  deleteExpenditure,
  getDepartmentExpenditures,
  updateExpenditure,
} from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(ExpenditureSearchSpec, args.request)
  const expenditures = await getDepartmentExpenditures(q)

  return sjson({ expenditures })
}

export const action = (args: ActionArgs) => {
  return methods(args, {
    PUT: method(ExpenditureSpec, updateExpenditure),
    DELETE: method(IntId, ({ id }) => deleteExpenditure(id)),
  })
}

const ExpenditurePage = () => {
  const { expenditures } = useGet<typeof loader>()

  return (
    <>
      <Title order={3} mb="xl">
        Department Expenditure
      </Title>
      <ExpenditureList expenditureList={expenditures} />
    </>
  )
}

export default ExpenditurePage
