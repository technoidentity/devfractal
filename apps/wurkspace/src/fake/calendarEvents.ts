import type { CalendarEvent } from '@prisma/client'
import { v4 as uuid } from 'uuid'
export const calendarEvents: Omit<CalendarEvent, 'createdAt' | 'updatedAt'>[] =
  [
    {
      id: uuid(),
      attendee1Email: '',
      attendee2Email: '',
      attendee1ResponseStatus: 'accepted',
      attendee2ResponseStatus: 'accepted',
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: uuid(),
      attendee1Email: '',
      attendee2Email: '',
      attendee1ResponseStatus: 'accepted',
      attendee2ResponseStatus: 'tentative',
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: uuid(),
      attendee1Email: '',
      attendee2Email: '',
      attendee1ResponseStatus: 'accepted',
      attendee2ResponseStatus: 'declined',
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: uuid(),
      attendee1Email: '',
      attendee2Email: '',
      attendee1ResponseStatus: 'accepted',
      attendee2ResponseStatus: 'declined',
      startTime: new Date(),
      endTime: new Date(),
    },
  ]
