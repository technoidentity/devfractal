import { Title } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { sjson } from '@srtp/remix-node'
import { useGet } from '@srtp/remix-react'
import { CostSearchSpec, useDepartmentName } from '~/common'
import { safeQuery } from '~/core'
import { DepartmentCostList } from '~/features/cost'
import { getDepartmentsCost } from '~/models'

export async function loader(args: LoaderArgs) {
  const q = safeQuery(CostSearchSpec, args.request)
  const { personCost, expenditures } = await getDepartmentsCost(q)

  const expendituresMap = new Map(
    expenditures.map(e => [e.departmentId, e.total]),
  )

  return sjson({ personCost, expendituresMap })
}

const DepartmentsCostPage = () => {
  const { personCost, expendituresMap } = useGet<typeof loader>()
  const getDepartmentName = useDepartmentName()

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
      <Title order={3} mb="xl">
        View Department Costing
      </Title>
      <DepartmentCostList costList={costList} />
    </>
  )
}

export default DepartmentsCostPage
