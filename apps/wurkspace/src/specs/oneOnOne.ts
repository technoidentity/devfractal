import { z } from 'zod'
import { Action } from './action'
import { Discussion } from './discussion'

export const Card = z.union([Action, Discussion])
export type Card = Readonly<z.infer<typeof Card>>

export const OneOnOneValues = z.array(Card)
export type OneOnOneValues = Readonly<z.infer<typeof OneOnOneValues>>

export const isAction = (card: Card): card is Action => 'description' in card

export const isDiscussion = (card: Card): card is Discussion =>
  'discussion' in card
