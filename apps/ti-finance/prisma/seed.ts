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

const financeDepartment = {
  name: 'emma',
  department: 'Finance',
  ctc: 18_00_000,
  fromDate: new Date('2017-01-26'),
  toDate: new Date('2018-01-26'),
  billable: Billable.billable,
}
const itDepartment = {
  name: 'watson',
  department: 'IT',
  ctc: 16_00_000,
  fromDate: new Date('2016-04-14'),
  toDate: new Date('2017-04-14'),
  billable: Billable.nonBillable,
}

const developmentDepartment = {
  name: 'reena',
  department: 'Development',
  ctc: 10_00_000,
  fromDate: new Date('2020-06-21'),
  toDate: new Date('2021-06-21'),
  billable: Billable.nonBillable,
}

const itBudgets = [
  {
    category: Billable.billable,
    amount: 100_00_000,
    financialYear: new Date('2021-08-5'),
  },
]

const developmentBudgets = [
  {
    category: Billable.billable,
    amount: 100_00_000,
    financialYear: new Date('2021-08-5'),
  },
  {
    category: Billable.nonBillable,
    amount: 100_00_000,
    financialYear: new Date('2021-08-5'),
  },
  {
    category: Billable.billable,
    amount: 100_00_000,
    financialYear: new Date('2021-08-5'),
  },
]

const financeBudgets = [
  {
    amount: 100_00_000,
    category: Billable.billable,
    financialYear: new Date('2021-08-5'),
  },
  {
    category: Billable.nonBillable,
    amount: 100_00_000,
    financialYear: new Date('2021-08-5'),
  },
  {
    category: Billable.billable,
    amount: 100_00_000,
    financialYear: new Date('2021-08-5'),
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

  await prisma.department.create({
    data: {
      ...financeDepartment,
      budget: { create: financeBudgets },
      expenditure: { create: financeExpenditures },
    },
  })

  await prisma.department.create({
    data: {
      ...itDepartment,
      budget: { create: itBudgets },
      expenditure: { create: itExpenditures },
    },
  })

  await prisma.department.create({
    data: {
      ...developmentDepartment,
      budget: { create: developmentBudgets },
      expenditure: { create: developmentExpenditures },
    },
  })

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
