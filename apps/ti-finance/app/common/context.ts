import { useSafeContext } from '@srtp/remix-react'
import React, { createContext } from 'react'
import { capitalizeFirstLetter } from './stringUtil'

type User = { id: string; username: string }
type Department = { id: number; name: string }

type DepartmentsContext = {
  departments: Department[]
  departmentsMap: Map<number, Department>
}

type UsersContext = {
  users: User[]
  usersMap: Map<string, User>
}

export const DepartmentsContext = createContext<DepartmentsContext | undefined>(
  undefined,
)

export const UsersContext = createContext<UsersContext | undefined>(undefined)

export function useDepartments() {
  return useSafeContext(DepartmentsContext, 'use DepartmentsContext')
}

export function useUsers() {
  return useSafeContext(UsersContext, 'use UsersContext')
}

export function useDepartmentsSelect() {
  const { departments } = useDepartments()

  const data = React.useMemo(
    () =>
      departments.map(d => ({
        label: capitalizeFirstLetter(d.name),
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
        label: capitalizeFirstLetter(u.username),
        value: u.id,
      })),
    [users],
  )

  return data
}
