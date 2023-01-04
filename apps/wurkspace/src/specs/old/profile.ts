import { z } from 'zod'

const Label = z.object({
  value: z.string(),
})

const IntelligentContext = z.object({
  type: z.string(),
  content: z.string().array(),
})
const Content = z.object({
  id: z.string(),
  value: z.string(),
})
const OKR = z.object({
  objectives: z.string(),
  results: z.number(),
})
const PersonalInformation = z.object({
  id: z.string(),
  value: z.string(),
})
const UserProfile = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  bio: z.string(),
  manager: z.string(),
})
export interface OrganizationData {
  name: string
  position: string
  isLoggedIn?: boolean
  children?:
    | OrganizationData[]
    | { name: string; position: string; isLoggedIn: boolean }[]
}
const OrganizationData: z.ZodSchema<OrganizationData> = z.lazy(() =>
  z.object({
    name: z.string(),
    position: z.string(),
    isLoggedIn: z.boolean().optional(),
    children: z.array(OrganizationData),
  }),
)

export type IntelligentContext = z.infer<typeof IntelligentContext>
export type Label = z.infer<typeof Label>
export type Content = z.infer<typeof Content>
export type OKR = z.infer<typeof OKR>
export type PersonalInformation = z.infer<typeof PersonalInformation>
export type UserProfile = z.infer<typeof UserProfile>
