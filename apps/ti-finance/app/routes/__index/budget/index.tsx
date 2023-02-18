import { Group } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
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

// const initialFilters: Filters<BudgetAllocation> = {
//   department: '',
//   category: '',
//   amount: '',
//   financialYear: '',
// }

export async function loader(_: LoaderArgs) {
  const budgets = await getBudgetAllocations()

  return json({ budgets })
}

const BudgetPage = () => {
  const { budgets } = useLoaderData<typeof loader>()

  // @TODO: use budget allocation schema late from the add form
  const totalCost = budgets.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <>
      <Group position="left" m="md">
        <TotalSpendCard cost={totalCost} label="Total Amount" />
        <Filters />
      </Group>

      <Table striped rows={budgets} columns={columns} perPage={3} />
    </>
  )
}

export default BudgetPage
