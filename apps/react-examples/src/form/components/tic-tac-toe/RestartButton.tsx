import { Button } from '@mantine/core'

interface RestartButtonProps {
  onClick(): void
}

export const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <Button
      bg="teal.300"
      mt={10}
      fs="md"
      fw="bold"
      color="black"
      onClick={onClick}
    >
      Restart
    </Button>
  )
}
