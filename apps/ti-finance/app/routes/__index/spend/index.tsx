import { Group, Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import type { Department } from '@prisma/client'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import type { Column, Filters } from '@srtp/table'
import { ClientTable } from '@srtp/table'
import React from 'react'
import { z } from 'zod'
import { capitalizeFirstLetter } from '~/common/stringUtil'
import { DepartmentSchema } from '~/common/validators'
import { TotalSpendCard } from '~/components/TotalSpendCard'
import { getDepartments } from '~/models/department.server'

const columns: Column<Department>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'department', label: 'Department' },
  { accessor: 'ctc', label: 'Cost' },
]
const initialFilters: Filters<Department> = {
  id: '',
  department: '',
  name: '',
  ctc: '',
}

export async function loader(_: LoaderArgs) {
  const departments = await getDepartments()

  return json({ departments })
}

const PeopleSpendPage = () => {
  const { departments } = useLoaderData<typeof loader>()

  const departmentList = React.useMemo(
    () => z.array(DepartmentSchema).parse(departments),
    [departments],
  )

  const names = departments.map(d => capitalizeFirstLetter(d.name))

  const totalCost = departmentList.reduce((acc, curr) => acc + curr.ctc, 0)

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />
      <Group position="left" m="md">
        <DatePicker placeholder="Pick date" label="From date" size="xs" />
        <DatePicker placeholder="Pick date" label="To date" size="xs" />
        <Select size="xs" label="Person" data={names} />
      </Group>

      <ClientTable
        striped
        renderColumn={(k, row) => {
          //   const r = row[k] instanceof Date ? formatDate(row[k] as Date) : row[k]
          return <td key={k}>{row[k].toString()}</td>
        }}
        rows={departmentList}
        columns={columns}
        initialFilters={initialFilters}
        perPage={3}
      />
    </>
  )
}

export default PeopleSpendPage
