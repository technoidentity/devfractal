import SuperJSON from 'superjson'
import { sjson, useGet } from '~/common'

export const loader = () => {
  return sjson({
    fromDate: new Date(),
    myMap: new Map([
      [1, 2],
      [3, 5],
    ]),
  })
}

export default () => {
  const data = useGet<typeof loader>()

  return <pre>{SuperJSON.stringify(data)}</pre>
}
