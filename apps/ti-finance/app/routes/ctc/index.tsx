import { Button, Container, Group } from '@mantine/core'
import type { Ctc } from '@prisma/client'
import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { cast, str } from '@srtp/core'
import type { Column, Filters } from '@srtp/table'
import { ClientTable } from '@srtp/table'
import { IsoDate } from 'specs'
import { z } from 'zod'
import { DeleteUserCtc } from '~/components/DeleteUserCtc'
import { EditUserCtcModal } from '~/components/EditUserCtcModal'
import { deleteUserCtc, editUserCtc, getUsersCtc } from '~/models/ctc.server'
import { badRequest } from '~/models/request.server'
import { zodErrors } from './new'

export const _CtcModel = z.object({
  id: z.string(),
  name: z.string(),
  ctc: z.coerce.number().int().min(0),
  fromDate: IsoDate,
  toDate: IsoDate,
})

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
  const { _action, ...values } = Object.fromEntries(await request.formData())
  const result = _CtcModel.safeParse(values)

  if (result.success) {
    if (_action === 'delete') {
      const result = await deleteUserCtc(str(values.id))
      if (result.type === 'success') {
        return {}
      }
      return result.error
    }
  } else {
    const fieldErrors = result.success ? {} : zodErrors(result.error)

    const fields = { values }

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({
        fieldErrors,
        fields,
        formError: null,
      })
    }
  }

  if (result.success) {
    if (_action === 'edit') {
      const result = await editUserCtc(cast(_CtcModel, values))
      if (result.type === 'success') {
        return {}
      } else {
        if (result.type === 'failure') {
          return badRequest({
            fieldErros: null,
            fields: null,
            formError: result.error,
          })
        }
      }
    }
  } else {
    const fieldErrors = result.success ? {} : zodErrors(result.error)

    const fields = { values }

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({
        fieldErrors,
        fields,
        formError: null,
      })
    }
  }
  return {}
}

const UsersCtcPage = () => {
  const { usersCtc } = useLoaderData<typeof loader>()
  const actionData = useActionData()

  const ctc = z.array(_CtcModel).parse(usersCtc)

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
          rows={ctc}
          columns={columns}
          initialFilters={initialFilters}
          perPage={3}
        />
      </Container>
    </>
  )
}

export default UsersCtcPage
