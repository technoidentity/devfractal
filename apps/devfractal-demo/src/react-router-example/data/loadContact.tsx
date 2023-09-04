import { type LoaderFunctionArgs } from 'react-router-dom'
import axios from 'redaxios'
import { type Contact } from '../types'
import { baseUrl } from './common'

export const loadRequest = ({
  params,
}: LoaderFunctionArgs): Promise<Contact> => {
  return axios
    .get(`${baseUrl}/users/${params['id']}`)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}
