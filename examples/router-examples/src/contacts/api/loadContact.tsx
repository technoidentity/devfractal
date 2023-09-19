import { cast, number, spec } from '@srtp/core'

import { type LoaderFunctionArgs } from 'react-router-dom'

import { Contact } from '../types'
import { api } from './common'

const Params = spec({ id: number() })

export const loadRequest = async (
  args: LoaderFunctionArgs,
): Promise<Contact> => {
  const params = cast(Params, args.params)

  return api.get(Contact, `/users/${params.id}`)
}
