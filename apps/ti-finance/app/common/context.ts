import { mget } from '@srtp/fn'
import React from 'react'
import { capitalize } from './stringUtil'
import { context } from '@srtp/react'

type User = { tiId: string; username: string }
type Department = { id: number; name: string }

type DepartmentsContext = {
  departments: Department[]
  departmentsMap: Map<number, Department>
}

type UsersContext = {
  users: User[]
  usersMap: Map<string, User>
}

export const [DepartmentsContext, useDepartments] = context<DepartmentsContext>(
  {
    errorMessage: 'use DepartmentsContext Provider',
  },
)

export const [UsersContext, useUsers] = context<UsersContext>({
  errorMessage: 'use UsersContext Provider',
})

export function useUserName() {
  const { usersMap } = useUsers()
  return React.useCallback(
    (tid: string) => mget(usersMap, tid).username,
    [usersMap],
  )
}

export function useDepartmentName() {
  const { departmentsMap } = useDepartments()
  return React.useCallback(
    (depId: number) => mget(departmentsMap, depId).name,
    [departmentsMap],
  )
}

export function useDepartmentsSelect() {
  const { departments } = useDepartments()

  const data = React.useMemo(
    () =>
      departments.map(d => ({
        label: capitalize(d.name),
        value: d.id.toString(),
      })),
    [departments],
  )

  return data
}

export function useUsersSelect() {
  const { users } = useUsers()

  const data = React.useMemo(
    () =>
      users.map(u => ({
        label: capitalize(u.username),
        value: u.tiId,
      })),
    [users],
  )

  return data
}
