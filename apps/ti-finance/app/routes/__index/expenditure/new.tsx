import type { ActionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { handleResult, safeAction } from '@srtp/remix-node'
import { CreateExpenditureSchema } from '~/common'
import { useServerErrors } from '~/components/common'
import { CreateExpenditureForm } from '~/components/expenditure'
import { createExpenditure, getDepartmentList } from '~/models'

export async function loader() {
  return json({ departments: await getDepartmentList() })
}

export const action = (args: ActionArgs) =>
  safeAction(CreateExpenditureSchema, args, async values => {
    const userResult = await createExpenditure(values)

    return handleResult(userResult, { redirectUrl: '/expenditure' })
  })

const CreateExpenditurePage = () => {
  const actionData = useServerErrors(CreateExpenditureSchema)

  return <CreateExpenditureForm {...actionData} />
}

export default CreateExpenditurePage
