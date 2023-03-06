import type { Prisma } from '@prisma/client'
import { Billable, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// seed one to many relationship
// https://www.prisma.io/docs/guides/database/seed-database#seed-one-to-many-relationship

const users: Prisma.UserCreateInput[] = [
  { tiId: 'TI_101', username: 'rachel', email: 'rachel@remix.run' },
  { tiId: 'TI_102', username: 'emma', email: 'emma@technoidentity.com' },
  { tiId: 'TI_103', username: 'reena', email: 'reena@technoidentity.com' },
  { tiId: 'TI_104', username: 'miland', email: 'miland@technoidentity.com' },
  { tiId: 'TI_105', username: 'monica', email: 'monica@technoidentity.com' },
  {
    tiId: 'TI_106',
    username: 'chandler',
    email: 'chandler@technoidentity.com',
  },
  { tiId: 'TI_107', username: 'joe', email: 'joe@technoidentity.com' },
]

const ctcList: Prisma.CtcCreateManyInput[] = [
  {
    tiId: 'TI_101',
    ctc: 10,
    fromDate: new Date('2017-01-26'),
    toDate: new Date('2018-01-26'),
  },
  {
    tiId: 'TI_102',
    ctc: 100,
    fromDate: new Date('2016-04-14'),
    toDate: new Date('2017-04-14'),
  },
  {
    tiId: 'TI_103',
    ctc: 24,
    fromDate: new Date('2020-06-21'),
    toDate: new Date('2021-06-21'),
  },
  {
    tiId: 'TI_104',
    ctc: 18,
    fromDate: new Date('2021-08-5'),
    toDate: new Date('2022-08-5'),
  },
]

const financeDeptMap: Prisma.DepartmentMappingUncheckedCreateWithoutDepartmentInput[] =
  [
    {
      tiId: 'TI_101',
      ctc: 18_00_000,
      fromDate: new Date('2017-01-26'),
      toDate: new Date('2018-01-26'),
      category: Billable.billable,
    },
    {
      tiId: 'TI_102',
      ctc: 16_00_000,
      fromDate: new Date('2017-05-14'),
      toDate: new Date('2018-05-14'),
      category: Billable.nonBillable,
    },
  ]

const itDeptMap: Prisma.DepartmentMappingUncheckedCreateWithoutDepartmentInput[] =
  [
    {
      tiId: 'TI_102',
      ctc: 16_00_000,
      fromDate: new Date('2016-04-14'),
      toDate: new Date('2017-04-14'),
      category: Billable.nonBillable,
    },
    {
      tiId: 'TI_101',
      // department: 'IT',
      ctc: 18_00_000,
      fromDate: new Date('2018-02-26'),
      toDate: new Date('2019-02-26'),
      category: Billable.billable,
    },
    {
      tiId: 'TI_103',
      ctc: 10_00_000,
      fromDate: new Date('2021-07-21'),
      toDate: new Date('2022-07-21'),
      category: Billable.nonBillable,
    },
  ]

const salesDeptMap: Prisma.DepartmentMappingUncheckedCreateWithoutDepartmentInput[] =
  [
    {
      tiId: 'TI_102',
      ctc: 16_00_000,
      fromDate: new Date('2016-04-14'),
      toDate: new Date('2017-04-14'),
      category: Billable.nonBillable,
    },
    {
      tiId: 'TI_101',
      // department: 'IT',
      ctc: 18_00_000,
      fromDate: new Date('2018-02-26'),
      toDate: new Date('2019-02-26'),
      category: Billable.billable,
    },
    {
      tiId: 'TI_103',
      ctc: 10_00_000,
      fromDate: new Date('2021-07-21'),
      toDate: new Date('2022-07-21'),
      category: Billable.nonBillable,
    },
  ]

const devDeptMap: Prisma.DepartmentMappingUncheckedCreateWithoutDepartmentInput[] =
  [
    {
      tiId: 'TI_103',
      ctc: 10_00_000,
      fromDate: new Date('2020-06-21'),
      toDate: new Date('2021-06-21'),
      category: Billable.nonBillable,
    },
  ]

const itBudgets = [
  {
    category: Billable.billable,
    amount: 3400000,
    financialYear: new Date('2021-08-5'),
  },
]

const salesBudgets = [
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
    amount: 1200000,
    date: new Date('2021-06-5'),
    remarks: 'Identify and Plug Budget Leaks',
  },
]

const salesExpenditures = [
  {
    category: Billable.billable,
    amount: 1200000,
    date: new Date('2021-06-5'),
    remarks: 'Identify and Plug Budget Leaks',
  },
]

const financeExpenditures = [
  {
    category: Billable.nonBillable,
    amount: 34_00_000,
    date: new Date('2021-07-5'),
    remarks: 'Assess New Income and Expenses',
  },
]

const developmentExpenditures = [
  {
    category: Billable.billable,
    amount: 56_00_000,
    date: new Date('2021-08-5'),
    remarks: 'Review Your Financial Goals',
  },
  {
    category: Billable.nonBillable,
    amount: 12_00_000,
    date: new Date('2021-09-5'),
    remarks: 'Modify Your Budget',
  },
]

async function createUser(user: Prisma.UserCreateInput) {
  // cleanup the existing database
  await prisma.user.delete({ where: { email: user.email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash(`${user.username}iscool`, 10)

  await prisma.user.create({
    data: {
      ...user,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

async function seed() {
  // await prisma.ctc.deleteMany()
  // await prisma.budget.deleteMany()
  // await prisma.expenditure.deleteMany()
  // await prisma.departmentMapping.deleteMany()
  // await prisma.department.deleteMany()
  // await prisma.user.deleteMany()
  // await prisma.access.deleteMany()

  for (const user of users) {
    await createUser(user)
  }

  await prisma.ctc.createMany({ data: ctcList })
  await prisma.department.create({
    data: {
      name: 'Finance',
      parentCostCenter: 'technoidentity',
      Access: {
        create: [
          {
            User: { connect: { tiId: 'TI_101' } },
          },
          {
            User: { connect: { tiId: 'TI_102' } },
          },
        ],
      },
      DepartmentMapping: { create: financeDeptMap },
      Budget: { create: financeBudgets },
      Expenditure: { create: financeExpenditures },
    },
  })

  await prisma.department.create({
    data: {
      name: 'IT',
      parentCostCenter: 'vendeep',
      Access: {
        create: [
          {
            User: { connect: { tiId: 'TI_105' } },
          },
          {
            User: { connect: { tiId: 'TI_107' } },
          },
          {
            User: { connect: { tiId: 'TI_103' } },
          },
        ],
      },
      DepartmentMapping: { create: itDeptMap },
      Budget: { create: itBudgets },
      Expenditure: { create: itExpenditures },
    },
  })
  await prisma.department.create({
    data: {
      name: 'Development',
      parentCostCenter: 'vendeep',
      Access: {
        create: [
          {
            User: { connect: { tiId: 'TI_102' } },
          },
          {
            User: { connect: { tiId: 'TI_103' } },
          },
        ],
      },
      DepartmentMapping: { create: devDeptMap },
      Budget: { create: developmentBudgets },
      Expenditure: { create: developmentExpenditures },
    },
  })

  await prisma.department.create({
    data: {
      name: 'Sales',
      parentCostCenter: 'seartipy',
      Access: {
        create: [
          {
            User: { connect: { tiId: 'TI_101' } },
          },
          {
            User: { connect: { tiId: 'TI_106' } },
          },
        ],
      },
      DepartmentMapping: { create: salesDeptMap },
      Budget: { create: salesBudgets },
      Expenditure: { create: salesExpenditures },
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
