import { jstr } from '@srtp/core'

export const Pre = ({ value }: { readonly value?: unknown }) => (
  <pre>{value ? jstr(value) : 'empty value'}</pre>
)
