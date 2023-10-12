import { isUndefined } from '@srtp/core'
import { chain, map, pipe, range } from '@srtp/fn'

import type { Player } from './Square'

const getRow = <T>(
  n: number,
  row: number,
  squares: readonly T[],
): readonly T[] =>
  chain(
    range(n),
    map(i => squares[row * n + i]),
  )

const getColumn = <T>(
  n: number,
  col: number,
  squares: readonly T[],
): readonly T[] =>
  chain(
    range(n),
    map(i => squares[col + i * n]),
  )

export const squares = chain(
  range(9),
  map(i => i.toString()),
)

const getLeftDiagonal = <T>(n: number, squares: readonly T[]): readonly T[] =>
  chain(
    range(n),
    map(i => squares[(n + 1) * i]),
  )

const getRightDiagonal = <T>(n: number, squares: readonly T[]): readonly T[] =>
  chain(
    range(n),
    map(i => squares[n * i + (n - 1 - i)]),
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
