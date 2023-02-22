import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { ExpenditureSpec, IntId } from '~/common'
import { ExpenditureSearchSpec } from '~/features/expenditure'
import { ExpenditureList } from '~/features/expenditure/List'
import { safeQuery, sjson, useGet } from '~/core'
import {
  deleteExpenditure,
  getDepartmentExpenditures,
  updateExpenditure,
} from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(ExpenditureSearchSpec.partial(), args.request)
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

  return <ExpenditureList expenditureList={expenditures} />
}

export default ExpenditurePage
