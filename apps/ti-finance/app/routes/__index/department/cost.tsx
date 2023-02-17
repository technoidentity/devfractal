import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'

import { DepartmentCostList } from '~/components/department/CostList'
import {
  getDepartmentList,
  getDepartmentsCost,
} from '~/models/departmentMapping.server'

export async function loader(_: LoaderArgs) {
  const { personCost, expenditures } = await getDepartmentsCost()
  const departments = await getDepartmentList()

  console.log('personCost', personCost)
  console.log('expenditure', expenditures)
  return json({ personCost, expenditures, departments })
}

const DepartmentsPage = () => {
  const { personCost, expenditures, departments } =
    useLoaderData<typeof loader>()
  const departmentsMap = new Map(departments.map(d => [d.name, d.id]))
  const expendituresMap = new Map(
    expenditures.map(e => [e.departmentId, e.total]),
  )

  const costList = personCost.map(e => {
    const departmentId = departmentsMap.get(e.department)
    invariant(departmentId !== undefined, 'departmentId is undefined')

    const otherExpenditures = expendituresMap.get(departmentId) || 0
    invariant(otherExpenditures !== undefined, 'otherExpenditures is undefined')

    const peopleCost = e.total

    const totalCost = otherExpenditures + peopleCost

    return {
      id: e.department,
      peopleCost,
      otherExpenditures,
      totalCost,
    }
  })

  //   const depExpList = departmentsCost.map(d => ({
  //     department: d.department,
  //     peopleCost: d.ctc,
  //     otherExpenditures: d.expenditure
  //       .map(v => v.amount)
  //       .reduce((acc, cur) => acc + cur, 0),
  //     totalCost:
  //       d.ctc +
  //       d.expenditure.map(v => v.amount).reduce((acc, cur) => acc + cur, 0),
  //   }))

  return (
    <>
      <DepartmentCostList costList={costList} />
    </>
  )
}

export default DepartmentsPage
