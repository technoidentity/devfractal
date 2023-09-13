import { isUndefined } from '@srtp/core'
import { map, pipe, range, toArray } from '@srtp/fn'

import type { Player } from './Square'

const getRow = <T>(
  n: number,
  row: number,
  squares: readonly T[],
): readonly T[] =>
  pipe(
    range(n),
    map(i => squares[row * n + i]),
    toArray,
  )

const getColumn = <T>(
  n: number,
  col: number,
  squares: readonly T[],
): readonly T[] =>
  pipe(
    range(n),
    map(i => squares[col + i * n]),
    toArray,
  )

export const squares = pipe(
  range(9),
  map(i => i.toString()),
  toArray,
)

const getLeftDiagonal = <T>(n: number, squares: readonly T[]): readonly T[] =>
  pipe(
    range(n),
    map(i => squares[(n + 1) * i]),
    toArray,
  )

const getRightDiagonal = <T>(n: number, squares: readonly T[]): readonly T[] =>
  pipe(
    range(n),
    map(i => squares[n * i + (n - 1 - i)]),
    toArray,
  )

const getAllTriplets = <T>(
  n: number,
  squares: readonly T[],
): ReadonlyArray<ReadonlyArray<T>> => {
  const r = range(0, n)
  return [
    ...pipe(
      r,
      map(i => getRow(n, i, squares)),
    ),
    ...pipe(
      r,
      map(i => getColumn(n, i, squares)),
    ),
    getLeftDiagonal(n, squares),
    getRightDiagonal(n, squares),
  ]
}

const isSame = (t: readonly Player[]): boolean =>
  (t[0] === 'X' || t[0] === 'O') && t.every(e => e === t[0])

const getSame = (triplets: ReadonlyArray<ReadonlyArray<Player>>): Player => {
  const r = triplets.find(isSame)
  return isUndefined(r) ? 'none' : r[0]
}

export const getWinner = (n: number, squares: readonly Player[]): Player =>
  getSame(getAllTriplets(n, squares))
