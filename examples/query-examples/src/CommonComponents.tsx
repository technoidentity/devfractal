import { CastError } from '@srtp/core'
import { Container, H1, Paragraph, Ul } from '@srtp/ui'
import { Loader2 } from 'lucide-react'
import { type FallbackProps } from 'react-error-boundary'
import { ZodError } from 'zod'

export type ZodErrorProps = {
  readonly error: CastError | ZodError
}

export const ZodErrorView = ({ error }: ZodErrorProps) => {
  return (
    <Container>
      <H1 className="text-red-500">Cast Error</H1>
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

export const ErrorFallback = (props: FallbackProps) => {
  if (props.error instanceof CastError || props.error instanceof ZodError) {
    return <ZodErrorView error={props.error} />
  }

  return (
    <Container>
      <H1 className="text-red-500">Something went wrong</H1>
      <Paragraph className="text-lg">{props.error.message}</Paragraph>
    </Container>
  )
}

export const Loading = (
  <div className="flex justify-center items-center h-full w-full">
    <Loader2 className="h-1/3 w-1/3 animate-spin" />
  </div>
)
