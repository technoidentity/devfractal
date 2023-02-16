import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { json, redirect } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, safeAction } from '@srtp/remix-node'
import type { ExpenditureSchema } from '~/common/validators'
import { CreateExpenditureSchema } from '~/common/validators'
import { ExpenditureForm } from '~/components/expenditure/Create'
import { getDepartmentList } from '~/models/department.server'
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
  const departments = useLoaderData<typeof loader>().departments
  const actionData = useActionData<typeof action>()

  return <ExpenditureForm errors={actionData} departments={departments} />
}

export default CreateExpenditurePage
