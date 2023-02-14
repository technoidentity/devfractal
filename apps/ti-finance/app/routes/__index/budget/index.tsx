import { Group, Select } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import type { Column, Filters } from '@srtp/table'
import { capitalizeFirstLetter } from '~/common/stringUtil'
import { DatePicker } from '@mantine/dates'
import { TotalSpendCard } from '~/components/TotalSpendCard'
import type { BudgetAllocation } from '~/models/budget.server'
import { getBudgetAllocations } from '~/models/budget.server'
import { Table } from '~/components/common/Table'

const columns: Column<BudgetAllocation>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'financialYear', label: 'Financial_year' },
]

const initialFilters: Filters<BudgetAllocation> = {
  department: '',
  category: '',
  amount: '',
  financialYear: '',
}

export async function loader(_: LoaderArgs) {
  const budgets = await getBudgetAllocations()

  return json({ budgets })
}

const BudgetPage = () => {
  const { budgets } = useLoaderData<typeof loader>()

  const names = budgets.map(d => ({
    label: capitalizeFirstLetter(d.category),
    value: d.category,
  }))

  // @TODO: use budget allocation schema late from the add form
  const totalCost = budgets.reduce((acc, curr) => acc + curr.amount, 0)
  return (
    <>
      <Group position="left" m="md">
        <TotalSpendCard cost={totalCost} label="Total Amount" />
        <Group>
          <Select label="Department" data={names} size="xs" />
          <DatePicker size="xs" label="Financial year" />
        </Group>
      </Group>
      <Table
        striped
        rows={budgets as any}
        columns={columns}
        initialFilters={initialFilters}
        perPage={3}
      />
    </>
  )
}

export default BudgetPage
