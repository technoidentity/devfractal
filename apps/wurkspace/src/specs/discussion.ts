import { IsoDate } from '@core/isoDate'
import { z } from 'zod'
import { CardSelection, Category } from './enums'

export const Discussion = z.object({
  id: z.number(),
  forwarded: z.boolean(),
  discussion: z.string(),
  addedById: z.string(),
  meetingId: z.string(),
  notes: z.string().nullable(),
  select: CardSelection,
  date: IsoDate,
  category: Category,
})

export type Discussion = Readonly<z.infer<typeof Discussion>>
