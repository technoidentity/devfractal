import { Group } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
import { Table, TotalSpendCard } from '~/common'
import { BudgetSearchForm, BudgetSearchSpec } from '~/features/budget'
import { safeQuery, sjson, useGet } from '~/core'
import type { BudgetAllocation } from '~/models'
import { getBudgetAllocations } from '~/models'

const columns: Column<BudgetAllocation>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'financialYear', label: 'Financial_year' },
]

export async function loader(args: LoaderArgs) {
  const q = safeQuery(BudgetSearchSpec.partial(), args.request)

  const budgets = await getBudgetAllocations(q)
  const totalCost = budgets.reduce((acc, curr) => acc + curr.amount, 0)

  return sjson({ budgets, totalCost })
}

const BudgetPage = () => {
  const { budgets, totalCost } = useGet<typeof loader>()

  return (
    <>
      <Group position="left" m="md">
        <TotalSpendCard cost={totalCost} label="Total Amount" />
        <BudgetSearchForm />
      </Group>

      <Table rows={budgets} columns={columns} />
    </>
  )
}

export default BudgetPage
