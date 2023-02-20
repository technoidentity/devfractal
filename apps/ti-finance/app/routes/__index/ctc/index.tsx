import type { ActionArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { CtcSpec, IntId, sjson, useGet } from '~/common'
import { AddLink } from '~/components/common'
import { CtcList } from '~/components/ctc/List'
import { deleteCtc, getCtcList, updateCtc } from '~/models'

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CtcSpec, updateCtc),
    DELETE: method(IntId, ({ id }) => deleteCtc(id)),
  })

export async function loader() {
  const ctcList = await getCtcList()

  return sjson(ctcList)
}

const CtcPage = () => {
  const ctcList = useGet<typeof loader>()

  return (
    <>
      <AddLink link="/ctc/new" />
      <CtcList ctcList={ctcList} />
    </>
  )
}

export default CtcPage
