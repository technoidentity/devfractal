import { Flex } from '@mantine/core'

import type { People } from '../../../utils/types'

import { PersonView } from './Person'

interface GalleryProps {
  people: People
}
export const Gallery = ({ people }: GalleryProps) => {
  return (
    <Flex>
      <h1>Amazing scientists</h1>
      {people.map(person => (
        <PersonView key={person.id} person={person} />
      ))}
    </Flex>
  )
}
