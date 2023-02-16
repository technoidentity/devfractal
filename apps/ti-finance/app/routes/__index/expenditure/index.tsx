import { Button, Group, Select } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
import { capitalizeFirstLetter } from '~/common/stringUtil'
import { DatePicker } from '@mantine/dates'
import { method, methods } from '@srtp/remix-node'
import { number, string } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import type { ListExpenditureSchema } from '~/common/validators'
import { ExpenditureSchema } from '~/common/validators'
import { Table } from '~/components/common/Table'
import { DeleteExpenditure } from '~/components/expenditure/Delete'
import { EditExpenditureForm } from '~/components/expenditure/Edit'
import { TotalSpendCard } from '~/components/TotalSpendCard'
import { getDepartmentList } from '~/models/department.server'
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

// const initialFilters: Filters<ListExpenditureSchema> = {
//   category: '',
//   amount: '',
//   date: '',
//   department: '',
//   remarks: '',
// }

export async function loader(_: LoaderArgs) {
  const expenditures = await getDepartmentExpenditures()

  return json({ expenditures, departments: await getDepartmentList() })
}

export const action = (args: ActionArgs) => {
  return methods(args, {
    PUT: method(ExpenditureSchema, updateExpenditure),
    DELETE: method(z.object({ id: number }), ({ id }) => deleteExpenditure(id)),
  })
}

const ExpenditurePage = () => {
  const { expenditures, departments } = useLoaderData<typeof loader>()

  const expList = React.useMemo(
    () =>
      z
        .array(
          ExpenditureSchema.extend({
            departmentId: number,
            department: string,
            id: number,
          }),
        )
        .parse(expenditures),
    [expenditures],
  )
  const names = expList.map(d => ({
    label: capitalizeFirstLetter(d.department),
    value: d.category,
  }))

  const categories = [
    { value: 'billable', label: 'Billable' },
    { value: 'nonBillable', label: 'Non_Billable' },
  ]

  const totalCost = expList.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Amount" />
      <Group position="left" m="md">
        <Group>
          <DatePicker size="xs" label="From Date" />
          <DatePicker size="xs" label="To Date" />
          <Select label="Category" size="xs" data={categories} />
          <Select label="Department" data={names} size="xs" />
          <Button component="a" href="/expenditure/new">
            Add
          </Button>
        </Group>
      </Group>
      <Table
        striped
        rows={expList}
        columns={columns}
        Actions={({ row }) => {
          return (
            <Group>
              <DeleteExpenditure id={row.id} />
              <EditExpenditureForm exp={row} departments={departments} />
            </Group>
          )
        }}
        perPage={3}
      />
    </>
  )
}

export default ExpenditurePage

// PUT: async args => {
//   console.log(
//     'action put received',
//     Object.fromEntries(await args.request.clone().formData()),
//   )
//   return safeAction(
//     ExpenditureSchema.extend({ departmentId: number }),
//     args,
//     async values => {
//       const result = await updateExpenditure(values)
//       return isFail(result) ? badRequest({ error: result.fail }) : json({})
//     },
//   )
// },
//     DELETE: args =>
//       safeAction(z.object({ id: number }), args, async values => {
//         const result = await deleteExpenditure(values.id)
//         return isFail(result) ? badRequest({ error: result.fail }) : json({})
//       }),
