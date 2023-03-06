import React from 'react'
import { DepartmentsContext, UsersContext } from '~/common'

export type AppProviderProps = Readonly<{
  readonly departments: Readonly<{ id: number; name: string }>[]
  readonly users: Readonly<{ tiId: string; username: string }>[]
}>

export function AppProvider({
  departments,
  users,
  children,
}: React.PropsWithChildren<AppProviderProps>) {
  const departmentsMap = React.useMemo(
    () => new Map(departments.map(department => [department.id, department])),
    [departments],
  )

  const usersMap = React.useMemo(
    () => new Map(users.map(user => [user.tiId, user])),
    [users],
  )

  const depValue = React.useMemo(
    () => ({ departments, departmentsMap }),
    [departments, departmentsMap],
  )

  const usersValue = React.useMemo(
    () => ({ users, usersMap }),
    [users, usersMap],
  )

  return (
    <DepartmentsContext.Provider value={depValue}>
      <UsersContext.Provider value={usersValue}>
        {children}
      </UsersContext.Provider>
    </DepartmentsContext.Provider>
  )
}
