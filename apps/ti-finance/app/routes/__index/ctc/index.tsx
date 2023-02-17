import type { ActionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { number } from '@srtp/validator'
import { z } from 'zod'
import { CtcSchema, ListCtcSchema } from '~/common/validators'
import { useSafeLoaderData } from '~/components/common'
import { CtcList } from '~/components/ctc/List'
import { deleteCtc, getCtcList, updateCtc } from '~/models/ctc.server'

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CtcSchema, updateCtc),
    DELETE: method(z.object({ id: number }), ({ id }) => deleteCtc(id)),
  })

export async function loader() {
  const data = await getCtcList()

  return json({ data })
}

const spec = z.object({ data: z.array(ListCtcSchema) })

const CtcPage = () => {
  const { data } = useSafeLoaderData(spec)

  return <CtcList ctcList={data} />
}

export default CtcPage
