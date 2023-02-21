import type { LoaderArgs } from '@remix-run/server-runtime'
import React from 'react'
import { sjson, useDepartmentName, useGet } from '~/common'
import { safeQuery } from '~/components/common'
import {
  CostSearchForm,
  CostSearchSpec,
  DepartmentCostList,
} from '~/components/cost'
import { getDepartmentsCost } from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(CostSearchSpec.partial(), args.request)
  const { personCost, expenditures } = await getDepartmentsCost(q)

  return sjson({ personCost, expenditures })
}

const DepartmentsPage = () => {
  const { personCost, expenditures } = useGet<typeof loader>()
  const getDepartmentName = useDepartmentName()

  const expendituresMap = React.useMemo(
    () => new Map(expenditures.map(e => [e.departmentId, e.total])),
    [expenditures],
  )

  const costList = personCost.map(e => {
    const otherExpenditures = expendituresMap.get(e.departmentId) || 0
    const peopleCost = e.total
    const totalCost = otherExpenditures + peopleCost

    return {
      id: e.departmentId,
      department: getDepartmentName(e.departmentId),
      peopleCost,
      otherExpenditures,
      totalCost,
    }
  })

  return (
    <>
      <CostSearchForm />
      <DepartmentCostList costList={costList} />
    </>
  )
}

export default DepartmentsPage
