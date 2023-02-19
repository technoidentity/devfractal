import type { ActionArgs } from '@remix-run/server-runtime'
import { json, redirect } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, safeAction } from '@srtp/remix-node'
import type { ExpenditureSchema } from '~/common/validators'
import { CreateExpenditureSchema } from '~/common/validators'
import { useFormData } from '~/components/common'
import { CreateExpenditureForm } from '~/components/expenditure'
import { getDepartmentList } from '~/models/departmentMapping.server'
import { createExpenditure } from '~/models/expenditure.server'

export async function loader() {
  return json({ departments: await getDepartmentList() })
}

export const action = (args: ActionArgs) =>
  safeAction(CreateExpenditureSchema, args, async values => {
    const userResult = await createExpenditure(values)

    return isFail(userResult)
      ? badRequest<ExpenditureSchema>({ error: userResult.fail })
      : redirect('/expenditure')
  })

const CreateExpenditurePage = () => {
  const actionData = useFormData(CreateExpenditureSchema)

  return <CreateExpenditureForm {...actionData} />
}

export default CreateExpenditurePage
