import { Group } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
import React from 'react'
import { Filters } from '~/components/budget/Filters'
import { TotalSpendCard } from '~/components/common'
import { Table } from '~/components/common/Table'
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

  return json({ budgets })
}

const BudgetPage = () => {
  const { budgets } = useLoaderData<typeof loader>()

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
