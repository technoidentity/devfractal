import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { ExpenditureSchema, IntId, sjson, useGet } from '~/common'
import { ExpenditureList } from '~/components/expenditure/List'
import {
  deleteExpenditure,
  getDepartmentExpenditures,
  updateExpenditure,
} from '~/models/expenditure.server'

export async function loader(_: LoaderArgs) {
  const expenditures = await getDepartmentExpenditures()

  return sjson({ expenditures })
}

export const action = (args: ActionArgs) => {
  return methods(args, {
    PUT: method(ExpenditureSchema, updateExpenditure),
    DELETE: method(IntId, ({ id }) => deleteExpenditure(id)),
  })
}

const ExpenditurePage = () => {
  const { expenditures } = useGet<typeof loader>()

  return <ExpenditureList expenditureList={expenditures} />
}

export default ExpenditurePage
