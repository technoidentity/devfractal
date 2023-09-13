import { Box, Grid } from '@mantine/core'

import type { Player } from './Square'
import { SquareView } from './Square'

export const n = 3

interface GameBoardProps {
  readonly squares: readonly Player[]
  onClick(idx: number): void
}

export const GameBoard: React.FC<GameBoardProps> = ({ squares, onClick }) => {
  return (
    <Box w="300px" mt="20px">
      <Grid columns={12}>
        {squares.map((square, index) => (
          <Grid.Col span={4} key={index}>
            <SquareView onClick={onClick} idx={index} value={square} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}

// rows={`repeat(${n},1fr)`}
