import type { LoaderArgs } from '@remix-run/server-runtime'
import React from 'react'
import { sjson, useGet } from '~/common'
import { CostFilters } from '~/components/department'

import { DepartmentCostList } from '~/components/department/CostList'
import { getDepartmentsCost } from '~/models'

export async function loader(_: LoaderArgs) {
  const { personCost, expenditures } = await getDepartmentsCost()

  return sjson({ personCost, expenditures })
}

const DepartmentsPage = () => {
  const { personCost, expenditures } = useGet<typeof loader>()

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
      peopleCost,
      otherExpenditures,
      totalCost,
    }
  })

  return (
    <>
      <CostFilters />
      <DepartmentCostList costList={costList} />
    </>
  )
}

export default DepartmentsPage
