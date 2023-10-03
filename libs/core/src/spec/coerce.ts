import { z } from 'zod'

import { cast } from './casts'
import { isDefined } from './is'

export const CIsoDate = (refine?: (s: z.ZodDate) => z.ZodDate) => {
  let spec = z.coerce.date()
  if (isDefined(refine)) {
    spec = refine(spec)
  }
  return z.union([z.string().datetime(), z.date()]).pipe(spec)
}

export const IsoDateLike = CIsoDate()
export type IsoDateLike = z.infer<typeof IsoDateLike>

export const CDate = (refine?: (s: z.ZodDate) => z.ZodDate) => {
  let spec = z.coerce.date()
  if (isDefined(refine)) {
    spec = refine(spec)
  }
  return z.union([z.number().int(), z.string(), z.date()]).pipe(spec)
}

export const DateLike = CDate()
export type DateLike = z.infer<typeof DateLike>

export const CStr = (refine?: (s: z.ZodString) => z.ZodString) => {
  let spec = z.coerce.string()
  if (isDefined(refine)) {
    spec = refine(spec)
  }
  return z.union([z.number(), z.string(), z.boolean()]).pipe(spec)
}

export const StrLike = CStr()
export type StrLike = z.infer<typeof StrLike>

export const CBool = (refine?: (s: z.ZodBoolean) => z.ZodBoolean) => {
  let spec = z.boolean()
  if (isDefined(refine)) {
    spec = refine(spec)
  }
  return z
    .union([z.number(), z.string(), z.boolean()])
    .refine(v => ['false', 'true', '0', '1', '', false, true, 0, 1].includes(v))
    .pipe(spec)
}

export const BoolLike = CBool()
export type BoolLike = z.infer<typeof BoolLike>

export const CNum = (refine?: (s: z.ZodNumber) => z.ZodNumber) => {
  let spec = z.coerce.number()
  if (isDefined(refine)) {
    spec = refine(spec)
  }
  return z.union([z.number(), z.string()]).pipe(spec)
}

export const NumLike = CNum()
export type NumLike = z.infer<typeof NumLike>

export const CInt = (refine?: (s: z.ZodNumber) => z.ZodNumber) => {
  let spec = z.coerce.number().int()
  if (isDefined(refine)) {
    spec = refine(spec)
  }
  return z.union([z.number(), z.string()]).pipe(spec)
}

export const IntLike = CInt()
export type IntLike = z.infer<typeof IntLike>

export const toInt = (s: unknown): number => cast(IntLike, s)
export const toNum = (s: unknown): number => cast(NumLike, s)
export const toStr = (s: unknown): string => cast(StrLike, s)
export const toBool = (s: unknown): boolean => cast(BoolLike, s)
export const toDate = (s: unknown): Date => cast(DateLike, s)
export const toIsoDate = (s: unknown): Date => cast(IsoDateLike, s)
