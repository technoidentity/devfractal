import type { Meeting } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import type { Employee } from '@specs/employee'
import {
  calendarEvents,
  currentMeetingActions,
  currentMeetingDiscussions,
  employees,
  faqs,
  meetings,
  previousMeetingActions,
  previousMeetingDiscussions,
  users,
} from '../src/fake'

const db = new PrismaClient()

const createFaqs = async () => {
  for (const faq of faqs) {
    await db.faq.create({ data: faq })
  }
}

const createEvents = async () => {
  const previous = await db.calendarEvent.create({
    data: calendarEvents.previousEvent,
  })
  const current = await db.calendarEvent.create({
    data: calendarEvents.currentEvent,
  })
  const future = await db.calendarEvent.create({
    data: calendarEvents.futureEvent,
  })

  return { previous, current, future }
}

const createMeetings = async () => {
  const previous = await db.meeting.create({
    data: meetings.previousMeeting,
  })
  const current = await db.meeting.create({
    data: meetings.currentMeeting,
  })
  const future = await db.meeting.create({
    data: meetings.futureMeeting,
  })

  return { previous, current, future }
}

const createUsers = async () => {
  await db.user.create({ data: users.manager })
  await db.user.create({ data: users.report1 })
  await db.user.create({ data: users.report2 })

  const managerProfile = await db.employee.create({ data: employees.manager })
  const report1Profile = await db.employee.create({ data: employees.report1 })
  const report2Profile = await db.employee.create({ data: employees.report2 })

  return {
    managerProfile,
    report1Profile,
    report2Profile,
  }
}

async function setupOneOne(
  report1: Employee,
  manager: Employee,
  previous: Meeting,
) {
  const managerActions = previousMeetingActions.slice(0, 2)
  const reportActions = previousMeetingActions.slice(2)

  const managerDiscussions = previousMeetingDiscussions.slice(0, 2)
  const reportDiscussions = previousMeetingDiscussions.slice(2)

  for (const action of managerActions) {
    await db.action.create({
      data: {
        ...action,
        assignedToId: report1.email,
        addedById: manager.email,
        meetingId: previous.id,
      },
    })
  }

  for (const action of reportActions) {
    await db.action.create({
      data: {
        ...action,
        assignedToId: report1.email,
        addedById: report1.email,
        meetingId: previous.id,
      },
    })
  }

  for (const discussion of managerDiscussions) {
    await db.discussion.create({
      data: {
        ...discussion,
        addedById: manager.email,
        meetingId: previous.id,
      },
    })
  }

  for (const discussion of reportDiscussions) {
    await db.discussion.create({
      data: {
        ...discussion,
        addedById: report1.email,
        meetingId: previous.id,
      },
    })
  }
}

async function setupOneOnOneNew(
  report1: Employee,
  manager: Employee,
  current: Meeting,
) {
  const managerActions = currentMeetingActions.slice(0, 1)
  const reportActions = currentMeetingActions.slice(1)

  const managerDiscussions = currentMeetingDiscussions.slice(0, 2)
  const reportDiscussions = currentMeetingDiscussions.slice(2)

  for (const action of managerActions) {
    await db.action.create({
      data: {
        ...action,
        assignedToId: report1.email,
        addedById: manager.email,
        meetingId: current.id,
      },
    })
  }

  for (const action of reportActions) {
    await db.action.create({
      data: {
        ...action,
        assignedToId: report1.email,
        addedById: report1.email,
        meetingId: current.id,
      },
    })
  }

  for (const discussion of managerDiscussions) {
    await db.discussion.create({
      data: {
        ...discussion,
        addedById: manager.email,
        meetingId: current.id,
      },
    })
  }

  for (const discussion of reportDiscussions) {
    await db.discussion.create({
      data: {
        ...discussion,
        addedById: report1.email,
        meetingId: current.id,
      },
    })
  }
}

async function seed() {
  await db.faq.deleteMany()
  await db.action.deleteMany()
  await db.discussion.deleteMany()
  await db.calendarEvent.deleteMany()
  await db.meeting.deleteMany()
  await db.employee.deleteMany()
  await db.account.deleteMany()
  await db.verificationToken.deleteMany()
  await db.session.deleteMany()
  await db.user.deleteMany()

  await createFaqs()

  const { managerProfile: manager, report1Profile: report1 } =
    await createUsers()

  await createEvents()

  const { previous, current } = await createMeetings()

  await setupOneOne(report1, manager, previous)
  await setupOneOnOneNew(report1, manager, current)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    db.$disconnect().catch(err => console.error(err))
  })
