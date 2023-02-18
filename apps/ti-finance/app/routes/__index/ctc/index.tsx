import type { ActionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { z } from 'zod'
import { CtcSchema, IntId, ListCtcSchema } from '~/common/validators'
import { useSafeLoaderData } from '~/components/common'
import { CtcList } from '~/components/ctc/List'
import { deleteCtc, getCtcList, updateCtc } from '~/models/ctc.server'

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CtcSchema, updateCtc),
    DELETE: method(IntId, ({ id }) => deleteCtc(id)),
  })

export async function loader() {
  const ctcList = await getCtcList()

  return json({ ctcList })
}

const spec = z.object({ ctcList: z.array(ListCtcSchema) })

const CtcPage = () => {
  const { ctcList } = useSafeLoaderData(spec)

  return <CtcList ctcList={ctcList} />
}

export default CtcPage
