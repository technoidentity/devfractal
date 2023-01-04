import { z } from 'zod'

export const ZohoProfile = z.object({
  EmailID: z.string(),
  Reporting_To: z.string().nullable(),
  'Reporting_To.Email': z.string().nullable(),
  LastName: z.string(),
  Photo: z.string(), // @TODO: photo_downloadURL??
  FirstName: z.string(),
  Mobile: z.string(),
  AboutMe: z.string(),
  EmployeeID: z.string(),
})

export type ZohoProfile = z.infer<typeof ZohoProfile>
