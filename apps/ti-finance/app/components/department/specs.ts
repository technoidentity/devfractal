import type { z } from 'zod'
import { DepartmentMappingSchema } from '~/common/validators'

export const CreateMappingSchema = DepartmentMappingSchema.omit({
  id: true,
})

export type CreateMappingSchema = z.infer<typeof CreateMappingSchema>
