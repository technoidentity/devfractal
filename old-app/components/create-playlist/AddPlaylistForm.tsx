import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
} from '@chakra-ui/react'
import React from 'react'


interface AddPlaylistFormValues {
  onSubmit(value: string): void
}

export const AddPlaylistForm: React.FC<AddPlaylistFormValues> = ({
  onSubmit,
}) => {
  const [playlistName, setPlaylistName] = React.useState('')
  const [readonly, setReadonly] = React.useState(false)
  const [placeholder, setPlaceholder] = React.useState('Enter Playlist Name...')
  const [disabled, setDisabled] = React.useState(false)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    evt.preventDefault()
    onSubmit(playlistName)
    setPlaylistName('')
    setReadonly(true)
    setPlaceholder(playlistName)
    setDisabled(true)
  }

  return (
    <Box>
      <Container p={10} borderBottom="4px solid teal">
        <form onSubmit={handleSubmit}>
          <Flex justifyContent="space-between">
            <FormControl id="playlist" mr={6} isRequired>
              <Input
                type="text"
                placeholder={placeholder}
                value={playlistName}
                isReadOnly={readonly}
                onChange={evt => setPlaylistName(evt.target.value)}
                focusBorderColor="teal.400"
              />
            </FormControl>
            <Button
              pl={8}
              pr={8}
              colorScheme="teal"
              type="submit"
              disabled={disabled}
            >
              Create Playlist
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  )
}
