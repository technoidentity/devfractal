import { IsoDate } from '@core/isoDate'
import { z } from 'zod'
import { CardSelection, Category } from './enums'

export const Action = z.object({
  id: z.number(),
  completed: z.boolean(),
  description: z.string(),
  progress: z.string().nullable(),
  select: CardSelection,
  dueDate: IsoDate,
  category: Category,
  addedById: z.string(),
  meetingId: z.string(),
  assignedToId: z.string(),
})

export type Action = Readonly<z.infer<typeof Action>>
