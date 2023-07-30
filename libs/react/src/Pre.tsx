import { jstr } from '@srtp/spec'

export const Pre = ({ value }: { readonly value?: unknown }) => (
  <pre>{value ? jstr(value) : 'empty value'}</pre>
)
