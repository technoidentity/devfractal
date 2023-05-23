/* eslint-disable @typescript-eslint/no-unsafe-call */

import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
