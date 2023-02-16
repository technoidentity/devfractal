import { Group, Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import type { Column } from '@srtp/table'
import React from 'react'
import { capitalizeFirstLetter } from '~/common/stringUtil'
import type { PeopleSpendSchema } from '~/common/validators'
import { Table } from '~/components/common/Table'
import { TotalSpendCard } from '~/components/TotalSpendCard'
import { getPeopleSpend } from '~/models/department.server'

interface Spendings extends Omit<PeopleSpendSchema, 'department'> {
  id: string
  departments: string[]
}

const columns: Column<Spendings>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'departments', label: 'Departments' },
  { accessor: 'cost', label: 'Cost' },
]

export async function loader(_: LoaderArgs) {
  const { personCost } = await getPeopleSpend()

  const spendings = {} as any

  const getSpending = (c: any) => ({
    id: c.tiId,
    cost: c._sum.ctc || 0,
    username: c.username,
    departments: [c.department],
  })

  personCost.forEach(c => {
    const spending = getSpending(c)
    if (!spendings[spending.id]) {
      spendings[spending.id] = spending
    } else {
      spendings[spending.id].cost += spending.cost
      spendings[spending.id].departments.push(...spending.departments)
    }
  })

  return json({ spendings })
}

const PeopleSpendPage = () => {
  const { spendings } = useLoaderData<typeof loader>()

  console.log(Object.values(spendings), 'spendings')

  const names = Object.values(spendings).map((d: any) => ({
    label: capitalizeFirstLetter(d.username),
    value: d.username,
  }))

  const totalCost = Object.values(spendings).reduce(
    (acc: number, s: any) => acc + s.cost,
    0,
  )

  const rows = React.useMemo(
    () =>
      Object.values(spendings).map((s: any) => ({
        ...s,
        departments: s.departments.join(', '),
      })),
    [spendings],
  )
  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />
      <Group position="left" m="md">
        <DatePicker placeholder="Pick date" label="From date" size="xs" />
        <DatePicker placeholder="Pick date" label="To date" size="xs" />
        <Select size="xs" label="Person" data={names} />
      </Group>

      <Table
        striped
        renderColumn={(k, row) => {
          //   const r = row[k] instanceof Date ? formatDate(row[k] as Date) : row[k]
          return <td key={k}>{row[k].toString()}</td>
        }}
        rows={rows}
        columns={columns}
        perPage={3}
      />
    </>
  )
}

export default PeopleSpendPage
