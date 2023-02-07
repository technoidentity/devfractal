import { Button, Container, Group } from '@mantine/core'
import type { Ctc } from '@prisma/client'
import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { cast, isFail, isOk, str } from '@srtp/core'
import type { Column, Filters } from '@srtp/table'
import { ClientTable } from '@srtp/table'
import { string } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import { badRequest, formErrors, fromFormData } from '~/common/utils'
import { CtcSchema } from '~/common/validators'
import { DeleteUserCtc } from '~/components/DeleteUserCtc'
import { EditUserCtcModal } from '~/components/EditUserCtcModal'
import { deleteUserCtc, editUserCtc, getUsersCtc } from '~/models/ctc.server'

const columns: Column<Ctc>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]
const initialFilters: Filters<Ctc> = {
  id: '',
  ctc: '',
  fromDate: '',
  toDate: '',
  name: '',
}

export async function loader(_: LoaderArgs) {
  const usersCtc = await getUsersCtc()
  return json({ usersCtc })
}

export async function action({ request }: ActionArgs) {
  const schema = CtcSchema.extend({ _action: string })
  const result = await fromFormData(schema, request)

  if (result.success) {
    const { _action, ...values } = result.data

    if (_action === 'delete') {
      const result = await deleteUserCtc(str(values.id))
      if (isFail(result)) {
        return badRequest({ error: result.fail })
      }
    }

    if (_action === 'edit') {
      const result = await editUserCtc(cast(CtcSchema, values))
      if (isFail(result)) {
        return badRequest({ error: result.fail })
      }
    }

    return {}
  } else {
    return badRequest({ fieldErrors: formErrors(result.error) })
  }
}

const UsersCtcPage = () => {
  const { usersCtc } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const ctcList = React.useMemo(
    () => z.array(CtcSchema).parse(usersCtc),
    [usersCtc],
  )

  return (
    <>
      <Group position="right" m="md">
        <Button component="a" href="/ctc/new">
          Add
        </Button>
      </Group>
      <Container m="lg">
        <ClientTable
          withBorder
          renderColumn={(k, row) => <td key={k}>{row[k].toString()}</td>}
          renderActions={r => {
            return (
              <Group>
                <DeleteUserCtc id={r.id} />
                <EditUserCtcModal ctc={r} errors={actionData} />
              </Group>
            )
          }}
          rows={ctcList}
          columns={columns}
          initialFilters={initialFilters}
          perPage={3}
        />
      </Container>
    </>
  )
}

export default UsersCtcPage
