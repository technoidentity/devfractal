import { createSHttp } from '@srtp/web'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const api = createSHttp(baseUrl)
