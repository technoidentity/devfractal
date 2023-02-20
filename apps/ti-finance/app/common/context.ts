import { get } from '@srtp/core'
import { useSafeContext } from '@srtp/remix-react'
import React, { createContext } from 'react'
import { capitalize } from './stringUtil'

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

export function useUserName() {
  const { usersMap } = useUsers()
  return React.useCallback(
    (tid: string) => get(usersMap, tid).username,
    [usersMap],
  )
}

export function useDepartmentName() {
  const { departmentsMap } = useDepartments()
  return React.useCallback(
    (depId: number) => get(departmentsMap, depId).name,
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
        value: u.id,
      })),
    [users],
  )

  return data
}
