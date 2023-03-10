import type * as Square from './Square'
import { Title } from '@mantine/core'

interface PlayerProps {
  readonly player: Square.Player
  readonly winner: Square.Player | 'Game over'
}

export const PlayerStatus: React.FC<PlayerProps> = ({ player, winner }) => {
  return (
    <>
      {winner === 'none' ? (
        <Title mb={5}>Player {player}, it's your turn!</Title>
      ) : winner === 'Game over' ? (
        <Title mb={5}>None! Won </Title>
      ) : (
        <Title mb={5}>Winner: Player {winner} 🥳🎉 </Title>
      )}
    </>
  )
}
