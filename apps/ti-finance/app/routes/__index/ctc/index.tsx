import type { ActionArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { CtcSpec, IntId } from '~/common'
import { CtcList } from '~/features/ctc'
import { AddLink, sjson, useGet } from '~/core'
import { deleteCtc, getCtcList, updateCtc } from '~/models'
import { Title } from '@mantine/core'

export async function loader() {
  const ctcList = await getCtcList()

  return sjson(ctcList)
}

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CtcSpec, updateCtc),
    DELETE: method(IntId, ({ id }) => deleteCtc(id)),
  })

const CtcPage = () => {
  const ctcList = useGet<typeof loader>()

  return (
    <>
      <Title order={3}>Person CTC</Title>
      <AddLink link="/ctc/new" />
      <CtcList ctcList={ctcList} />
    </>
  )
}

export default CtcPage
