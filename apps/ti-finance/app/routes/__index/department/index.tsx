import { Button, Container, Group } from '@mantine/core'
import type { Department } from '@prisma/client'
import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { formErrors, fromFormData } from '@srtp/remix-core'
import { badRequest } from '@srtp/remix-node'
import type { Column, Filters } from '@srtp/table'
import { ClientTable } from '@srtp/table'
import { string } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'

import { DepartmentSchema } from '~/common/validators'
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
  { accessor: 'department', label: 'Department' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
  { accessor: 'billable', label: 'Billable' },
]
const initialFilters: Filters<Department> = {
  id: '',
  department: '',
  fromDate: '',
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

  const departmentList = React.useMemo(
    () => z.array(DepartmentSchema).parse(departments),
    [departments],
  )
  return (
    <>
      <Group position="right" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>
      </Group>
      <Container m="lg">
        <ClientTable
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
    </>
  )
}

export default DepartmentsPage
