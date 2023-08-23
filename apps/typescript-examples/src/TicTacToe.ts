import invariant from 'tiny-invariant'
import {
  appendChildren,
  createElement,
  getElement,
  getSelector,
} from './domUtils'
import './ticTacToeStyles.css'
import { range } from '@srtp/fn'
import { isDefined, toInt, toStr } from '@srtp/core'

type Player = 'X' | 'O'

type GameResult = Player | 'Tie' | undefined

type Board = {
  readonly size: number
  cells: Array<Player | undefined>
  turn: Player
  result: GameResult
}

const initialGameState = (size: number): Board => {
  return {
    size,
    cells: Array(size * size).fill(undefined),
    turn: 'X',
    result: undefined,
  }
}

function ticTacToe(size: number): void {
  const gameState = initialGameState(size)

  const getRow = (i: number) => Math.floor(i / size)
  const getColumn = (i: number) => i % size

  const isTied = () => gameState.cells.every(c => !!c)

  const isWinner = (id: number, player: Player): boolean => {
    const rng = [...range(size)]
    const row = rng.map(j => getRow(id) * size + j)
    const column = rng.map(j => getColumn(id) + j * size)
    const diagonal = rng.map(i => i * (size + 1))
    const antiDiagonal = rng.map(i => (i + 1) * (size - 1))

    return [row, column, diagonal, antiDiagonal].some(line =>
      line.every(i => gameState.cells[i] === player),
    )
  }

  function updateResult(i: number) {
    if (isWinner(i, gameState.turn)) {
      gameState.result = gameState.turn
    } else if (isTied()) {
      gameState.result = 'Tie'
    }
  }

  function updateTurn() {
    gameState.turn = gameState.turn === 'X' ? 'O' : 'X'
  }

  function updateResultUI() {
    if (!gameState.result) {
      return
    }
    const winnerElement = getSelector('.winner')
    invariant(winnerElement instanceof HTMLElement)

    winnerElement.innerText =
      gameState.result === 'Tie' ? 'Game Tied' : `${gameState.result} wins!`
  }

  function updateCell(cell: HTMLElement, i: number) {
    if (gameState.cells[i]) {
      return
    }

    gameState.cells[i] = gameState.turn
    cell.innerText = gameState.turn
  }

  const handleClick = (e: MouseEvent) => {
    if (isDefined(gameState.result)) {
      return
    }

    const cell = e.target
    if (!(cell instanceof HTMLElement) || cell.className !== 'cell') {
      return
    }

    const id = toInt(cell.id)

    updateCell(cell, id)
    updateResult(id)
    updateResultUI()
    updateTurn()
  }

  const container = getElement('root')

  const createSquares = (n: number) =>
    [...range(n * n)].map(i =>
      createElement('button', { className: 'cell', id: toStr(i) }),
    )

  const createBoard = (container: HTMLElement, n: number) => {
    const board = createElement('div', { className: 'board' })
    board.onclick = handleClick
    container.appendChild(board)

    appendChildren(board, createSquares(n))

    const winner = createElement('div', { className: 'winner' })
    container.appendChild(winner)
  }

  createBoard(container, size)
}

ticTacToe(5)
