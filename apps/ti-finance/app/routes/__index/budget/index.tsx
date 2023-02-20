import { Group } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { isEmpty } from '@srtp/core'
import { safeQuery } from '@srtp/remix-node'
import type { Column } from '@srtp/table'
import React from 'react'
import { sjson, useGet } from '~/common'
import type { FiltersValues } from '~/components/budget'
import { BudgetFiltersSpec, BudgetFilters } from '~/components/budget'
import { Table, TotalSpendCard, useSearch } from '~/components/common'
import type { BudgetAllocation } from '~/models'
import { getBudgetAllocations } from '~/models'
import dayjs from 'dayjs'

const columns: Column<BudgetAllocation>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'financialYear', label: 'Financial_year' },
]

const thisYear = (year: number) => {
  const d = dayjs(new Date(year, 1, 1))
  return { gte: d.startOf('year').toDate(), lte: d.endOf('year').toDate() }
}

export async function loader(args: LoaderArgs) {
  const where = safeQuery(BudgetFiltersSpec.partial(), args.request)
  const financialYear = where.financialYear
    ? thisYear(where.financialYear)
    : undefined

  const budgets = await getBudgetAllocations({ ...where, financialYear })
  return sjson({ budgets })
}

const BudgetPage = () => {
  const { budgets } = useGet<typeof loader>()

  const totalCost = React.useMemo(
    () => budgets.reduce((acc, curr) => acc + curr.amount, 0),
    [budgets],
  )

  const [, set] = useSearch(BudgetFiltersSpec)

  const handleFilterChange = React.useCallback(
    (values: FiltersValues) => {
      if (!isEmpty(values)) {
        set(values)
      }
    },
    [set],
  )

  return (
    <>
      <Group position="left" m="md">
        <TotalSpendCard cost={totalCost} label="Total Amount" />
        <BudgetFilters onFilterChange={handleFilterChange} />
      </Group>

      <Table rows={budgets} columns={columns} />
    </>
  )
}

export default BudgetPage
