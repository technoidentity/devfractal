import React from 'react'
import { Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { BiMailSend } from 'react-icons/bi'
export interface SubmitButtonProps {
  handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void>
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
    variantcolor="teal"
    variant="outline"
    width="full"
    mt={4}
    onClick={handleSubmit}
  >
    {title}
  </Button>
)
