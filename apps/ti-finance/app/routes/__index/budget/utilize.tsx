import { Group, Title } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
import { BudgetUtilizedSearchSpec, Table, TotalSpendCard } from '~/common'
import { safeQuery, sjson, useGet } from '~/core'
import { BudgetSearchForm } from '~/features/budget'
import type { BudgetAllocation } from '~/models'
import { getBudgetUtilization } from '~/models'

const columns: Column<BudgetAllocation>[] = [
  { accessor: 'financialYear', label: 'Financial_year' },
  { accessor: 'department', label: 'Department' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'amount', label: 'Amount' },
]

export async function loader(args: LoaderArgs) {
  const q = safeQuery(BudgetUtilizedSearchSpec, args.request)

  const budgetsUtilized = await getBudgetUtilization(q)
  const totalCost = budgetsUtilized.reduce((acc, curr) => acc + curr.amount, 0)

  return sjson({ budgetsUtilized, totalCost })
}

const BudgetUtilizationPage = () => {
  const { budgetsUtilized, totalCost } = useGet<typeof loader>()

  return (
    <>
      <Title order={3} mb="xl">
        Budget Utilized View
      </Title>
      <TotalSpendCard cost={totalCost} label="Total Amount" />
      <BudgetSearchForm />
      <Group position="left"></Group>

      <Table rows={budgetsUtilized} columns={columns} />
    </>
  )
}

export default BudgetUtilizationPage
