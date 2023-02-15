import type { ActionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { str } from '@srtp/core'
import { method, methods } from '@srtp/remix-node'
import { string } from '@srtp/validator'
import { z } from 'zod'
import { CtcSchema } from '~/common/validators'
import { listLoaderSpec, useSafeLoaderData } from '~/components/common'
import { CtcList } from '~/components/ctc/List'
import { deleteCtc, getCtcList, updateCtc } from '~/models/ctc.server'

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CtcSchema, updateCtc),
    DELETE: method(z.object({ id: string }), ({ id }) => deleteCtc(str(id))),
  })

export async function loader() {
  const data = await getCtcList()

  return json({ data })
}

const UsersCtcPage = () => {
  const { data } = useSafeLoaderData(listLoaderSpec(CtcSchema))

  return <CtcList ctcList={data} />
}

export default UsersCtcPage
