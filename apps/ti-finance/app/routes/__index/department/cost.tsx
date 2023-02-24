import type { LoaderArgs } from '@remix-run/server-runtime'
import React from 'react'
import { CostSearchSpec, useDepartmentName } from '~/common'
import { safeQuery, sjson, useGet } from '~/core'
import { CostSearchForm, DepartmentCostList } from '~/features/cost'
import { getDepartmentsCost } from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(CostSearchSpec, args.request)
  const { personCost, expenditures } = await getDepartmentsCost(q)

  return sjson({ personCost, expenditures })
}

const DepartmentsCostPage = () => {
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

export default DepartmentsCostPage
