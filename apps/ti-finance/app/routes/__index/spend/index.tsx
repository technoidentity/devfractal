import { Group, Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { get, mergeWithToMap } from '@srtp/core'
import type { Column } from '@srtp/table'
import React from 'react'
import { useDepartments, useUsers } from '~/common/context'
import { capitalizeFirstLetter } from '~/common/stringUtil'
import { Table } from '~/components/common/Table'
import { TotalSpendCard } from '~/components/TotalSpendCard'
import { getPeopleSpend } from '~/models/departmentMapping.server'

export async function loader(_: LoaderArgs) {
  const { personCost } = await getPeopleSpend()

  return json({ personCost })
}

type PeopleSpendSchema = {
  id: string
  username: string
  cost: number
  departments: string
}

const columns: Column<PeopleSpendSchema>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'departments', label: 'Departments' },
  { accessor: 'cost', label: 'Cost' },
]

const PeopleSpendPage = () => {
  console.log('PeopleSpendPage')
  const { personCost } = useLoaderData<typeof loader>()
  const { departmentsMap } = useDepartments()
  const { usersMap } = useUsers()

  type Spendings = Omit<PeopleSpendSchema, 'departments'> & {
    departments: string[]
  }
  const rows = React.useMemo(
    () =>
      Array.from(
        mergeWithToMap(personCost, 'tiId', (acc: Spendings | undefined, e) =>
          acc
            ? {
                id: e.tiId,
                username: get(usersMap, e.tiId).username,
                cost: acc.cost + e.ctc,
                departments: [
                  ...acc.departments,
                  get(departmentsMap, e.departmentId).name,
                ],
              }
            : {
                id: e.tiId,
                username: get(usersMap, e.tiId).username,
                cost: e.ctc,
                departments: [get(departmentsMap, e.departmentId).name],
              },
        ).values(),
      ).map(c => ({ ...c, departments: c.departments.join(', ') })),
    [personCost, departmentsMap, usersMap],
  )

  const names = rows.map(d => ({
    label: capitalizeFirstLetter(d.username),
    value: d.username,
  }))

  const totalCost = rows.reduce((acc, e) => acc + e.cost, 0)

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />
      <Group position="left" m="md">
        <DatePicker placeholder="Pick date" label="From date" size="xs" />
        <DatePicker placeholder="Pick date" label="To date" size="xs" />
        <Select size="xs" label="Person" data={names} />
      </Group>

      <Table striped rows={rows} columns={columns} />
    </>
  )
}

export default PeopleSpendPage
