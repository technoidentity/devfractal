import { Person } from '../../../utils/types'

interface PersonProps {
  person: Person
}

export const PersonView = ({ person }: PersonProps) => {
  return (
    <img
      className="avatar"
      src={`https://i.imgur.com/${person.imageId}s.jpg`}
      alt={person.name}
    />
  )
}
