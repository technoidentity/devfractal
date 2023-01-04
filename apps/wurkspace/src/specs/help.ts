import { z } from 'zod'

const Faq = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
})

export type FaqProps = z.infer<typeof Faq>
