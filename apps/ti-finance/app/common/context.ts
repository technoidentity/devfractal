import { useSafeContext } from '@srtp/remix-react'
import { createContext } from 'react'

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
