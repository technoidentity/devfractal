import { z } from 'zod'

export const Nat = z.number().int().nonnegative()
export type Nat = z.infer<typeof Nat>

export const Int = z.number().int()
export type Int = z.infer<typeof Int>
