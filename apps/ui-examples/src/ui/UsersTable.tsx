import {
  DTBody,
  DTCell,
  DTHead,
  DTHeader,
  DTRow,
  DTable,
  ThemeSelector,
} from '@srtp/ui'
import { usersList } from '../../../../packages/fake-tasks/dist'

const users = usersList()

export function UsersTable() {
  return (
    <div className="my-6 px-6 w-full overflow-y-auto">
      <ThemeSelector className="my-2" />
      <DTable>
        <DTHeader>
          <DTRow>
            <DTHead>Id</DTHead>
            <DTHead>Name</DTHead>
            <DTHead>Email</DTHead>
            <DTHead>Job</DTHead>
          </DTRow>
        </DTHeader>
        <DTBody>
          {users.map(user => (
            <DTRow key={user.id}>
              <DTCell>{user.id}</DTCell>
              <DTCell>{user.name}</DTCell>
              <DTCell>{user.email}</DTCell>
              <DTCell>{user.job}</DTCell>
            </DTRow>
          ))}
        </DTBody>
      </DTable>
    </div>
  )
}
