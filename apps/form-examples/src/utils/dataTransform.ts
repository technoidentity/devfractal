import type { Products } from './types'

export const categorizedProducts = (data: Products) => {
  // return data.reduce((acc, v) => {
  //   if (!acc[v.category]) {
  //     acc[v.category] = []
  //   }
  //   acc[v.category].push(v)
  //   return acc
  // }, {})

  const result: any = {}
  for (const obj of data) {
    if (!result[obj.category]) {
      result[obj.category] = [obj]
    } else {
      result[obj.category].push(obj)
    }
  }
  return result as Record<string, Products>
}
