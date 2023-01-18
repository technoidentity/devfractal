import { Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { BiMailSend } from 'react-icons/bi'
export interface SubmitButtonProps {
  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  readonly title: string
}
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  handleSubmit,
  title,
}) => (
  <Button
    type="submit"
    leftIcon={<Icon as={BiMailSend} />}
    bg="lightgreen"
    color="teal"
    variant="outline"
    width="full"
    mt={4}
    onClick={handleSubmit}
  >
    {title}
  </Button>
)
