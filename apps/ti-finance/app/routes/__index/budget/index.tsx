import { Group, Title } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { sjson } from '@srtp/remix-node'
import { useGet } from '@srtp/remix-react'
import type { Column } from '@srtp/table'
import { BudgetSearchSpec, Table, TotalSpendCard } from '~/common'
import { safeQuery } from '~/core'
import { BudgetSearchForm } from '~/features/budget'
import type { BudgetAllocation } from '~/models'
import { getBudgetAllocations } from '~/models'

const columns: Column<BudgetAllocation>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'financialYear', label: 'Financial_year' },
]

export async function loader(args: LoaderArgs) {
  const q = safeQuery(BudgetSearchSpec, args.request)

  const budgets = await getBudgetAllocations(q)
  const totalCost = budgets.reduce((acc, curr) => acc + curr.amount, 0)

  return sjson({ budgets, totalCost })
}

const BudgetPage = () => {
  const { budgets, totalCost } = useGet<typeof loader>()

  return (
    <>
      <Title order={3} mb="xl">
        Budget Allocated
      </Title>
      <TotalSpendCard cost={totalCost} label="Total Amount" />
      <Group position="left">
        <BudgetSearchForm />
      </Group>

      <Table rows={budgets} columns={columns} />
    </>
  )
}

export default BudgetPage
