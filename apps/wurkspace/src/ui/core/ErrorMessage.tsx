import { isStr, jstr } from '@srtp/spec'

export type ErrorMessageProps = Readonly<{
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
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
