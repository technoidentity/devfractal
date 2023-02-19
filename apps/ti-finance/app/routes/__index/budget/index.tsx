import { Group } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
import React from 'react'
import { sjson, useGet } from '~/common'
import { Filters } from '~/components/budget/Filters'
import { Table, TotalSpendCard } from '~/components/common'
import type { BudgetAllocation } from '~/models/budget.server'
import { getBudgetAllocations } from '~/models/budget.server'

const columns: Column<BudgetAllocation>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'financialYear', label: 'Financial_year' },
]

export async function loader(_: LoaderArgs) {
  const budgets = await getBudgetAllocations()

  return sjson({ budgets })
}

const BudgetPage = () => {
  const { budgets } = useGet<typeof loader>()

  const totalCost = React.useMemo(
    () => budgets.reduce((acc, curr) => acc + curr.amount, 0),
    [budgets],
  )

  return (
    <>
      <Group position="left" m="md">
        <TotalSpendCard cost={totalCost} label="Total Amount" />
        <Filters />
      </Group>

      <Table rows={budgets} columns={columns} />
    </>
  )
}

export default BudgetPage
