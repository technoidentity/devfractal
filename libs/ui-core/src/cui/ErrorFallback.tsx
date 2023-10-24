import { CastError } from '@srtp/core'
import { type FallbackProps } from 'react-error-boundary'
import { ZodError } from 'zod'

import { H2, Paragraph } from '../ui'
import { cn } from '../utils'

import { Container } from './Container'
import { ZodErrorView } from './ZodErrorView'

export type ErrorFallbackProps = FallbackProps & {
  cnTitle?: string
  className?: string
  message?: string
}
export const ErrorFallback = (props: ErrorFallbackProps) => {
  if (process.env.NODE_ENV === 'production') {
    if (props.error instanceof CastError || props.error instanceof ZodError) {
      return <ZodErrorView error={props.error} />
    }
  }

  return (
    <Container>
      <H2 className={cn('text-red-500', props.cnTitle)}>
        {props.message ?? 'Something went wrong'}
      </H2>

      <Paragraph className={cn('text-lg', props.className)}>
        {props.error.message}
      </Paragraph>
    </Container>
  )
}
