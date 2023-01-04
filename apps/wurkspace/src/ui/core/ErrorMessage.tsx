import { isStr, jstr } from '@core/casts'

export type ErrorMessageProps = Readonly<{
  error: Error | string | Record<string, unknown> | unknown
}>

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  // @TODO: production error handling

  const err =
    process.env.NODE_ENV === 'development'
      ? error instanceof Error
        ? error.message
        : isStr(error)
        ? error
        : jstr(error)
      : 'Something went wrong...'

  console.error(`ErrorMessage:`, err)

  return <pre className="text-red-500">{err}</pre>
}
