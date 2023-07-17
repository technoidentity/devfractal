import { z } from 'zod'

export const Product = z.object({
  category: z.string(),
  price: z.string(),
  stocked: z.boolean(),
  name: z.string(),
})

export type Product = z.infer<typeof Product>

export const Products = z.array(Product)

export type Products = z.infer<typeof Products>

export const Person = z.object({
  id: z.number(),
  name: z.string(),
  imageId: z.string(),
})

export type Person = z.infer<typeof Person>

export const People = z.array(Person)

export type People = z.infer<typeof People>

export const Sculpture = z.object({
  name: z.string(),
  artist: z.string(),
  description: z.string(),
  url: z.string(),
  alt: z.string(),
})

export type Sculpture = z.infer<typeof Sculpture>

export const SculptureList = z.array(Sculpture)

export type SculptureList = z.infer<typeof SculptureList>
