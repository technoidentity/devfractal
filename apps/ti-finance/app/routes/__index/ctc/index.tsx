import { useLoaderData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { isFail, str } from '@srtp/core'
import { actions, badRequest, safeAction } from '@srtp/remix-node'
import { string } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import { CtcSchema } from '~/common/validators'
import { CtcList } from '~/components/ctc/List'
import { deleteCtc, getCtcList, updateCtc } from '~/models/ctc.server'

export const action = (args: ActionArgs) =>
  actions(args, {
    PUT: args =>
      safeAction(CtcSchema, args, async values => {
        const result = await updateCtc(values)
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      }),

    DELETE: args =>
      safeAction(z.object({ id: string }), args, async values => {
        const result = await deleteCtc(str(values.id))
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      }),
  })

export async function loader() {
  const usersCtc = await getCtcList()
  return json({ usersCtc })
}

const UsersCtcPage = () => {
  const { usersCtc } = useLoaderData<typeof loader>()

  const ctcList = React.useMemo(
    () => z.array(CtcSchema).parse(usersCtc),
    [usersCtc],
  )

  return <CtcList ctcList={ctcList} />
}

export default UsersCtcPage
