import { Button, Group } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import type { Column } from '@srtp/table'
import React from 'react'
import { z } from 'zod'
import {
  ExpenditureSchema,
  IntId,
  ListExpenditureSchema,
  useDepartments,
} from '~/common'
import { Table, TotalSpendCard } from '~/components/common'
import {
  DeleteExpenditure,
  EditExpenditureForm,
  Filters,
} from '~/components/expenditure'
import {
  deleteExpenditure,
  getDepartmentExpenditures,
  updateExpenditure,
} from '~/models/expenditure.server'

const columns: Column<ListExpenditureSchema>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'date', label: 'Date' },
  { accessor: 'remarks', label: 'Remarks' },
]

export async function loader(_: LoaderArgs) {
  const expenditures = await getDepartmentExpenditures()

  return json({ expenditures })
}

export const action = (args: ActionArgs) => {
  return methods(args, {
    PUT: method(ExpenditureSchema, updateExpenditure),
    DELETE: method(IntId, ({ id }) => deleteExpenditure(id)),
  })
}

const Actions = ({ row }: { row: ListExpenditureSchema }) => {
  const { departments } = useDepartments()
  return (
    <Group>
      <DeleteExpenditure id={row.id} />
      <EditExpenditureForm exp={row} departments={departments} />
    </Group>
  )
}

const ExpenditurePage = () => {
  const { expenditures } = useLoaderData<typeof loader>()

  const expList = React.useMemo(
    () => z.array(ListExpenditureSchema).parse(expenditures),
    [expenditures],
  )

  const totalCost = React.useMemo(
    () => expList.reduce((acc, curr) => acc + curr.amount, 0),
    [expList],
  )

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Amount" />

      <Group position="left" m="md">
        <Filters />

        <Button component="a" href="/expenditure/new">
          Add
        </Button>
      </Group>

      <Table
        striped
        rows={expList}
        columns={columns}
        Actions={Actions}
        perPage={3}
      />
    </>
  )
}

export default ExpenditurePage
