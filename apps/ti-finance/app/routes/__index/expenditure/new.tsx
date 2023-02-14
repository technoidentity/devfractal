import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, safeAction } from '@srtp/remix-node'
import { ExpenditureSchema } from '~/common/validators'
import { ExpenditureForm } from '~/components/expenditure'
import { createExpenditure, getDepartments } from '~/models/expenditure.server'

export async function loader() {
  return json({ departments: await getDepartments() })
}

export const action = (args: ActionArgs) =>
  safeAction(ExpenditureSchema.omit({ id: true }), args, async values => {
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
