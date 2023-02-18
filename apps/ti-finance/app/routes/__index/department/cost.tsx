import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import { DepartmentCostList } from '~/components/department/CostList'
import { getDepartmentsCost } from '~/models/departmentMapping.server'

export async function loader(_: LoaderArgs) {
  const { personCost, expenditures } = await getDepartmentsCost()

  return json({ personCost, expenditures })
}

const DepartmentsPage = () => {
  const { personCost, expenditures } = useLoaderData<typeof loader>()

  const expendituresMap = new Map(
    expenditures.map(e => [e.departmentId, e.total]),
  )

  const costList = personCost.map(e => {
    const otherExpenditures = expendituresMap.get(e.departmentId) || 0
    const peopleCost = e.total
    const totalCost = otherExpenditures + peopleCost

    return {
      id: e.departmentId,
      peopleCost,
      otherExpenditures,
      totalCost,
    }
  })

  return <DepartmentCostList costList={costList} />
}

export default DepartmentsPage
