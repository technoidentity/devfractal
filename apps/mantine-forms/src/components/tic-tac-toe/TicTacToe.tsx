/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Flex } from '@mantine/core'
import produce from 'immer'
import React from 'react'
import { getWinner } from './calculateWinner'
import { GameBoard, n } from './GameBoard'
import { PlayerStatus } from './PlayerStatus'
import { RestartButton } from './RestartButton'
import { Player } from './Square'
import { StepsView } from './StepCount'

export function replaceAt<T>(
  arr: readonly T[],
  idx: number,
  item: T,
): readonly T[] {
  return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)]
}

interface State {
  readonly squares: readonly Player[]
  readonly player: Player
  readonly count: number
  readonly winner: Player | 'Game over'
}

const initialState: State = {
  squares: new Array(n * n).fill('none'),
  player: 'X',
  count: 0,
  winner: 'none',
}

export const TicTacToe = () => {
  const [state, set] = React.useState(initialState)
  const [steps, setSteps] = React.useState([initialState])

  const handleStepClick = (i: number) => {
    set(steps[i])
  }

  const handleClick = (id: number) => {
    if (state.winner !== 'none' || state.squares[id] !== 'none') {
      return
    }

    const newState = produce(state, draft => {
      draft.squares[id] = draft.player

      if (draft.player === 'X') {
        draft.player = 'O'
        draft.count += 1
      } else {
        draft.player === 'O'
        draft.player = 'X'
        draft.count += 1
      }
      if (draft.squares.every(i => i !== 'none') && draft.winner === 'none') {
        draft.winner = 'Game over'
      } else {
        draft.winner = getWinner(n, draft.squares)
      }
    })

    set(newState)
    setSteps(steps => [...steps, newState])
  }

  return (
    <Flex justify="center" direction="column" align="center" h="90vh">
      <PlayerStatus winner={state.winner} player={state.player} />
      <GameBoard squares={state.squares} onClick={handleClick} />
      {state.squares.some(i => i !== 'none') ? (
        <StepsView stepCount={steps.length} onClick={handleStepClick} />
      ) : null}
      <RestartButton onClick={() => set(initialState)} />
    </Flex>
  )
}
