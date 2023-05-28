import { range } from '@srtp/fn'
import { toInt, toStr } from '@srtp/spec'
import invariant from 'tiny-invariant'
import { appendChildren, element, getElement } from './domUtils'

type Player = 'X' | 'O'
// impossible states avoided by construction
type GameResult = Player | 'Tie' | undefined

type Board = {
  readonly size: number
  cells: Array<Player | undefined>
  turn: Player
  result: GameResult
}

const initialGameState = (size: number): Board => ({
  size,
  cells: Array(size * size).fill(undefined),
  turn: 'X',
  result: undefined,
})

const getRow = (i: number) => Math.floor(i / SIZE)
const getColumn = (i: number) => i % SIZE

const isTied = () => gameState.cells.every(c => !!c)

const isWinner = (id: number, player: Player): boolean => {
  const rng = [...range(SIZE)]
  const row = rng.map(j => getRow(id) * SIZE + j)
  const column = rng.map(j => getColumn(id) + j * SIZE)
  const diagonal = rng.map(i => i * (SIZE + 1))
  const antiDiagonal = rng.map(i => (i + 1) * (SIZE - 1))

  return [row, column, diagonal, antiDiagonal].some(line =>
    line.every(i => gameState.cells[i] === player),
  )
}

function updateResult(i: number) {
  if (isWinner(i, gameState.turn)) {
    gameState.result = gameState.turn
  } else if (isTied()) {
    gameState.result = 'Tie'
  } else {
    return
  }

  const winnerElement = document.querySelector('.winner')
  invariant(winnerElement instanceof HTMLElement)
  winnerElement.innerText =
    gameState.result === 'Tie' ? 'Game Tied' : `${gameState.result} wins!`
}

function updateTurn() {
  gameState.turn = gameState.turn === 'X' ? 'O' : 'X'
}

function updateCell(cell: HTMLElement, i: number) {
  if (gameState.cells[i]) {
    return
  }

  gameState.cells[i] = gameState.turn
  cell.innerText = gameState.turn
}
const handleClick = (e: MouseEvent) => {
  if (gameState.result !== undefined) {
    return
  }

  const cell = e.target
  if (!(cell instanceof HTMLElement) || cell.className !== 'cell') {
    return
  }
  const i = toInt(cell.id)

  updateCell(cell, i)
  updateResult(i)
  updateTurn()
}

const createSquares = (n: number) =>
  [...range(n * n)].map(i =>
    element('button', { className: 'cell', id: toStr(i) }),
  )

const createBoard = (n: number) => {
  const container = getElement('root')

  const board = element('div', { className: 'board' })
  board.onclick = handleClick
  container.appendChild(board)

  appendChildren(board, createSquares(n))

  const winner = element('div', { className: 'winner' })
  container.appendChild(winner)
}

const SIZE = 5
const gameState = initialGameState(SIZE)
createBoard(SIZE)
