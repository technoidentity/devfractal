import type { ActionArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { sjson, useGet } from '~/common'
import { CtcSchema, IntId } from '~/common/validators'
import { CtcList } from '~/components/ctc/List'
import { deleteCtc, getCtcList, updateCtc } from '~/models/ctc.server'

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CtcSchema, updateCtc),
    DELETE: method(IntId, ({ id }) => deleteCtc(id)),
  })

export async function loader() {
  const ctcList = await getCtcList()

  return sjson(ctcList)
}

const CtcPage = () => {
  const ctcList = useGet<typeof loader>()

  return <CtcList ctcList={ctcList} />
}

export default CtcPage
