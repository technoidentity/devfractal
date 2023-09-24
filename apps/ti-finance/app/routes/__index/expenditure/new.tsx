import type { ActionFunctionArgs } from '@remix-run/server-runtime'
import { onlyMethod } from '@srtp/remix-node'
import { CreateExpenditureSpec } from '~/common'
import { useServerErrors } from '~/core'
import { CreateExpenditureForm } from '~/features/expenditure'
import { createExpenditure } from '~/models'

export const action = (args: ActionFunctionArgs) =>
  onlyMethod(args, CreateExpenditureSpec, createExpenditure, {
    redirectUrl: '/expenditure',
  })

const CreateExpenditurePage = () => {
  const actionData = useServerErrors(CreateExpenditureSpec)

  return <CreateExpenditureForm {...actionData} />
}

export default CreateExpenditurePage
