import { CreateAccessSpec, dbTry, entityNotFound } from '~/common'
import { prisma } from '~/db.server'
import type { Department } from '~/prisma-client'

export async function getAccessList() {
  const departments = await prisma.department.findMany({
    include: {
      Access: {
        select: {
          departmentId: true,
          tiId: true,
          User: {
            select: {
              tiId: true,
              username: true,
            },
          },
        },
      },
    },
  })

  return departments.map(d => ({
    id: d.id,
    name: d.name,
    parentCostCenter: d.parentCostCenter,
    access: d.Access,
    users: d.Access.map(a => a.User.username).join(' , '),
  }))
}

export type DepartmentAccessList = Awaited<
  ReturnType<typeof getAccessList>
>[number]

export const createDepartment = async (
  department: CreateAccessSpec,
): Promise<any> => {
  const { departmentId, accessTiIds } = department
  await prisma.access.deleteMany({
    where: {
      departmentId,
    },
  })

  const newDepartment = await prisma.access.createMany({
    data: accessTiIds.map(tiId => ({
      tiId,
      departmentId,
    })),
  })

  return newDepartment
}

export const deleteDepartmentAccess = (id: Department['id']) =>
  dbTry(
    () =>
      prisma.department.delete({
        where: { id },
      }),
    { mapError: entityNotFound('department access') },
  )

export const updateDepartmentAccess = (data: CreateAccessSpec) =>
  dbTry(() =>
    prisma.department.update({
      data,
      where: { id: data.departmentId },
    }),
  )
