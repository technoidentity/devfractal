import { Box, Heading, HStack, Icon } from '@chakra-ui/react'
import { BsChatRightTextFill } from 'react-icons/bs'

export type HeaderProps = Readonly<{
  firstName: string
}>

export const Header = ({ firstName }: HeaderProps) => {
  return (
    <Box p="14px">
      <HStack>
        <Icon as={BsChatRightTextFill} color="#605BFF" />
        <Heading as="h1" size="md" color="#605BFF">
          One-on-one with {firstName}
        </Heading>
      </HStack>
    </Box>
  )
}
