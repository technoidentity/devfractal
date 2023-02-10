import { Button, Group } from '@mantine/core'
import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { isFail, str } from '@srtp/core'
import { badRequest, safeAction, safeActions } from '@srtp/remix-node'
import type { Column, Filters } from '@srtp/table'
import { ClientTable } from '@srtp/table'
import { string } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import { CtcSchema } from '~/common/validators'
import { DeleteCtcForm, EditCtcModalForm } from '~/components/ctc'
import { deleteUserCtc, editUserCtc, getUsersCtc } from '~/models/ctc.server'

const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  return formatter.format(date)
}

const columns: Column<CtcSchema>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]

const initialFilters: Filters<CtcSchema> = {
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

const edit = (request: LoaderArgs['request']) =>
  safeAction(CtcSchema, request, async values => {
    const result = await editUserCtc(values)
    if (isFail(result)) {
      return badRequest({ error: result.fail })
    }
    return json({})
  })

const remove = (request: LoaderArgs['request']) =>
  safeAction(z.object({ id: string }), request, async values => {
    const result = await deleteUserCtc(str(values.id))
    if (isFail(result)) {
      return badRequest({ error: result.fail })
    }
    return json({})
  })

export const action = ({ request }: ActionArgs) =>
  safeActions(z.enum(['edit', 'delete']), request, { edit, delete: remove })

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

      <ClientTable
        striped
        renderColumn={(k, row) => {
          const r = row[k] instanceof Date ? formatDate(row[k] as Date) : row[k]
          return <td key={k}>{r.toString()}</td>
        }}
        renderActions={r => (
          <Group>
            <DeleteCtcForm id={r.id} />
            <EditCtcModalForm ctc={r} errors={actionData} />
          </Group>
        )}
        rows={ctcList}
        columns={columns}
        initialFilters={initialFilters}
        perPage={3}
      />
    </>
  )
}

export default UsersCtcPage
