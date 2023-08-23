import { isUndefined } from '@srtp/core'

export type BTNode<T> = {
  value: T
  left: BTNode<T> | undefined
  right: BTNode<T> | undefined
}

export function* traverse<T>(node: BTNode<T> | undefined): IterableIterator<T> {
  if (isUndefined(node)) {
    return
  }

  yield* traverse(node.left)
  yield node.value
  yield* traverse(node.right)
}

// export const root: BTNode<number> = {
//   value: 5,
//   left: {
//     value: 3,
//     left: {
//       value: 2,
//       left: {
//         value: 1,
//         left: undefined,
//         right: undefined,
//       },
//       right: undefined,
//     },
//     right: {
//       value: 4,
//       left: undefined,
//       right: undefined,
//     },
//   },
//   right: {
//     value: 7,
//     left: {
//       value: 6,
//       left: undefined,
//       right: undefined,
//     },
//     right: {
//       value: 8,
//       left: undefined,
//       right: undefined,
//     },
//   },
// }

// for (const e of traverse(root)) {
//   // eslint-disable-next-line no-console
//   console.log(e)
// }
