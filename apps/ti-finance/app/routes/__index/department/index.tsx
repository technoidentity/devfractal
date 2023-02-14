import { Button, Container, Group, Select, Text } from '@mantine/core'
import type { Department } from '@prisma/client'
import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { formErrors, fromFormData } from '@srtp/remix-core'
import { badRequest } from '@srtp/remix-node'
import type { Column, Filters } from '@srtp/table'
import { string } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import { capitalizeFirstLetter } from '~/common/stringUtil'

import { DepartmentSchema } from '~/common/validators'
import { Table } from '~/components/common/Table'
import { DeleteDepartment } from '~/components/DeleteDepartment'
import { EditDepartmentModal } from '~/components/EditDepartmentModal'
import {
  deleteDepartment,
  editDepartment,
  getDepartments,
} from '~/models/department.server'

const columns: Column<Department>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC' },
  { accessor: 'department', label: 'Department' },
  { accessor: 'fromDate', label: 'From_Date' },
  { accessor: 'toDate', label: 'To_Date' },
  { accessor: 'billable', label: 'Billable' },
]
const initialFilters: Filters<Department> = {
  id: '',
  department: '',
  fromDate: '',
  ctc: '',
  toDate: '',
  name: '',
  billable: 'billable',
}

export async function loader(_: LoaderArgs) {
  const departments = await getDepartments()

  return json({ departments })
}

export async function action({ request }: ActionArgs) {
  const schema = DepartmentSchema.extend({ _action: string })
  const result = await fromFormData(schema, request)

  if (result.success) {
    const { _action, ...values } = result.data

    if (_action === 'delete') {
      const result = await deleteDepartment(values)
      if (isFail(result)) {
        return badRequest({ error: result.fail })
      }
    }

    if (_action === 'edit') {
      const result = await editDepartment(values)
      if (isFail(result)) {
        return badRequest({ error: result.fail })
      }
    }

    return {}
  } else {
    return badRequest({ fieldErrors: formErrors(result.error) })
  }
}

const DepartmentsPage = () => {
  const { departments } = useLoaderData<typeof loader>()

  const actionData = useActionData<typeof action>()

  const names = departments.map(d => ({
    label: capitalizeFirstLetter(d.name),
    value: d.name,
  }))

  const departmentData = departments.map(d => ({
    label: d.department.toUpperCase(),
    value: d.department,
  }))

  const departmentList = React.useMemo(
    () => z.array(DepartmentSchema).parse(departments),
    [departments],
  )

  return (
    <>
      <Group position="apart" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>
        <Group>
          <Text mt="md" fw="bold" size="sm">
            Filter by:{' '}
          </Text>
          <Select label="Department" data={departmentData} size="xs" />
          <Select label="Name" data={names} size="xs" />
        </Group>
      </Group>
<<<<<<< Updated upstream
      <Container m="lg">
        <Table
          withBorder
          Actions={({ r }: any) => {
            return (
              <Group>
                <DeleteDepartment id={r.id} />
                <EditDepartmentModal department={r} errors={actionData} />
              </Group>
            )
          }}
          rows={departmentList}
          columns={columns}
          initialFilters={initialFilters}
          perPage={3}
        />
      </Container>
=======
      <ClientTable
        striped
        Actions={({ row }) => {
          return (
            <Group>
              <DeleteDepartment id={row.id} />
              <EditDepartmentModal department={row} errors={actionData} />
            </Group>
          )
        }}
        rows={departmentList}
        columns={columns}
        initialFilters={initialFilters}
        perPage={3}
      />
>>>>>>> Stashed changes
    </>
  )
}

export default DepartmentsPage
