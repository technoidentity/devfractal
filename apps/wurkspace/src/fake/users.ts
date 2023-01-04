import { v4 as uuid } from 'uuid'
import { Employee, User as PrismaUser } from '@prisma/client'

type User = Omit<PrismaUser, 'createdAt' | 'updatedAt' | 'emailVerified'>

const manager: User = {
  id: uuid(),
  name: 'Venkat chitturi',
  email: 'venkat@technoidentity.com',
  image: '/user.svg',
}

const report1: User = {
  id: uuid(),
  name: 'Sravani Dande',
  email: 'sravani.dande@technoidentity.com',
  image: '/user.svg',
}

const report2: User = {
  id: uuid(),
  name: 'Ravindra Kumar',
  email: 'ravindra.kumar@technoidentity.com',
  image: '/user.svg',
}

const managerProfile: Employee = {
  email: 'venkat@technoidentity.com',
  firstName: 'Venkat',
  lastName: 'Chitturi',
  aboutMe: 'foo bar',
  mobile: '283537928',
  photo: './user.svg',

  userId: manager.id,

  managerEmail: null,
  managerFirstName: null,
  managerLastName: null,
}

const report1Profile: Employee = {
  email: 'sravani.dande@technoidentity.com',
  firstName: 'Sravani',
  lastName: 'Dande',
  aboutMe: 'bar Buzz',
  mobile: '938347589',
  photo: './user.svg',

  userId: report1.id,

  managerFirstName: 'Venkat',
  managerLastName: 'Chitturi',
  managerEmail: 'venkat@technoidentity.com',
}

const report2Profile: Employee = {
  email: 'ravindra.kumar@technoidentity.com',
  firstName: 'Ravindra',
  lastName: 'Kumar',
  aboutMe: 'foo bar',
  mobile: '396450893',
  photo: './user.svg',

  userId: report2.id,

  managerFirstName: 'Tejovathi',
  managerLastName: 'Maddi',
  managerEmail: 'tejovathi.maddi@technoidentity.com',
}

export const users = { manager, report1, report2 }

export const employees = {
  manager: managerProfile,
  report1: report1Profile,
  report2: report2Profile,
}
