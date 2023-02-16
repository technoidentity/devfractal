import type { Prisma } from '@prisma/client'
import { Billable, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// seed one to many relationship
// https://www.prisma.io/docs/guides/database/seed-database#seed-one-to-many-relationship

const tiUsersCtc = [
  {
    id: '100',
    name: 'emma',
    ctc: 10,
    fromDate: new Date('2017-01-26'),
    toDate: new Date('2018-01-26'),
  },
  {
    id: '101',
    name: 'watson',
    ctc: 16,
    fromDate: new Date('2016-04-14'),
    toDate: new Date('2017-04-14'),
  },
  {
    id: '102',
    name: 'reena',
    ctc: 24,
    fromDate: new Date('2020-06-21'),
    toDate: new Date('2021-06-21'),
  },
  {
    id: '103',
    name: 'miland',
    ctc: 18,
    fromDate: new Date('2021-08-5'),
    toDate: new Date('2022-08-5'),
  },
]

const dm1: Prisma.DepartmentMappingCreateInput = {
  tiId: 'TI_101',
  username: 'emma',
  department: 'Finance',
  ctc: 18_00_000,
  fromDate: new Date('2017-01-26'),
  toDate: new Date('2018-01-26'),
  category: Billable.billable,
}
const dm2: Prisma.DepartmentMappingCreateInput = {
  tiId: 'TI_102',
  username: 'watson',
  department: 'IT',
  ctc: 16_00_000,
  fromDate: new Date('2016-04-14'),
  toDate: new Date('2017-04-14'),
  category: Billable.nonBillable,
}

const dm3: Prisma.DepartmentMappingCreateInput = {
  tiId: 'TI_103',
  username: 'reena',
  department: 'Development',
  ctc: 10_00_000,
  fromDate: new Date('2020-06-21'),
  toDate: new Date('2021-06-21'),
  category: Billable.nonBillable,
}

const dm4: Prisma.DepartmentMappingCreateInput = {
  tiId: 'TI_101',
  username: 'emma',
  department: 'IT',
  ctc: 18_00_000,
  fromDate: new Date('2018-02-26'),
  toDate: new Date('2019-02-26'),
  category: Billable.billable,
}
const dm5: Prisma.DepartmentMappingCreateInput = {
  tiId: 'TI_102',

  username: 'watson',
  department: 'Finance',
  ctc: 16_00_000,
  fromDate: new Date('2017-05-14'),
  toDate: new Date('2018-05-14'),
  category: Billable.nonBillable,
}

const dm6: Prisma.DepartmentMappingCreateInput = {
  tiId: 'TI_103',
  username: 'reena',
  department: 'IT',
  ctc: 10_00_000,
  fromDate: new Date('2021-07-21'),
  toDate: new Date('2022-07-21'),
  category: Billable.nonBillable,
}

const financeDept: Prisma.DepartmentCreateInput = {
  name: 'Finance',
}

const itDept: Prisma.DepartmentCreateInput = {
  name: 'IT',
}
const developmentDept: Prisma.DepartmentCreateInput = {
  name: 'Development',
}

const itBudgets = [
  {
    category: Billable.billable,
    amount: 3400000,
    financialYear: new Date('2021-08-5'),
  },
]

const developmentBudgets = [
  {
    category: Billable.billable,
    amount: 2200000,
    financialYear: new Date('2019-08-5'),
  },
  {
    category: Billable.nonBillable,
    amount: 1000000,
    financialYear: new Date('2020-08-5'),
  },
  {
    category: Billable.billable,
    amount: 1500000,
    financialYear: new Date('2021-08-5'),
  },
]

const financeBudgets = [
  {
    amount: 2300000,
    category: Billable.billable,
    financialYear: new Date('2019-08-5'),
  },
  {
    category: Billable.nonBillable,
    amount: 3400000,
    financialYear: new Date('2021-08-5'),
  },
  {
    category: Billable.billable,
    amount: 1200000,
    financialYear: new Date('2022-08-5'),
  },
]

const itExpenditures = [
  {
    category: Billable.billable,
    amount: 100_00_000,
    date: new Date('2021-08-5'),
    remarks: 'Identify and Plug Budget Leaks',
  },
]
const financeExpenditures = [
  {
    category: Billable.nonBillable,
    amount: 100_00_000,
    date: new Date('2021-08-5'),
    remarks: 'Assess New Income and Expenses',
  },
]

const developmentExpenditures = [
  {
    category: Billable.billable,
    amount: 100_00_000,
    date: new Date('2021-08-5'),
    remarks: 'Review Your Financial Goals',
  },
  {
    category: Billable.nonBillable,
    amount: 100_00_000,
    date: new Date('2021-08-5'),
    remarks: 'Modify Your Budget',
  },
]

async function seed() {
  const email = 'rachel@remix.run'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash('racheliscool', 10)

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  for (let i = 0; i < tiUsersCtc.length; i += 1) {
    await prisma.ctc.create({
      data: tiUsersCtc[i],
    })
  }

  await prisma.departmentMapping.create({
    data: dm1,
  })

  await prisma.departmentMapping.create({
    data: dm2,
  })

  await prisma.departmentMapping.create({
    data: dm3,
  })

  await prisma.departmentMapping.create({
    data: dm4,
  })

  await prisma.departmentMapping.create({
    data: dm5,
  })

  await prisma.departmentMapping.create({
    data: dm6,
  })

  await prisma.department.create({
    data: {
      ...financeDept,
      Budget: { create: financeBudgets },
      Expenditure: { create: financeExpenditures },
    },
  })

  await prisma.department.create({
    data: {
      ...itDept,
      Budget: { create: itBudgets },
      Expenditure: { create: itExpenditures },
    },
  })
  await prisma.department.create({
    data: {
      ...developmentDept,
      Budget: { create: developmentBudgets },
      Expenditure: { create: developmentExpenditures },
    },
  })

  // await prisma.budget.createMany({
  //   data: itBudgets,
  // })

  // await prisma.budget.createMany({
  //   data: developmentBudgets,
  // })

  // await prisma.budget.createMany({
  //   data: financeBudgets,
  // })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
