import { CastError } from '@srtp/core'
import type { ZodError } from 'zod'

import { H1, Ul } from '../ui'

import { Container } from './Container'

export type ZodErrorProps = {
  readonly error: CastError | ZodError
}

// This usually is used in development mode. No need to make this flexible.
export const ZodErrorView = ({ error }: ZodErrorProps) => {
  return (
    <Container>
      {error instanceof CastError ? (
        <H1 className="text-red-500">Cast Error</H1>
      ) : (
        <H1 className="text-red-500">Zod Error</H1>
      )}

      <Ul>
        {Object.entries(error.errors).map(([key, error]) => (
          <li key={key} className="text-red-500">
            {key} : {error}
          </li>
        ))}
      </Ul>
    </Container>
  )
}
