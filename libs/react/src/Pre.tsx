import { jstr } from '@srtp/core'

// @TODO: remove this, ui lib already has this
export const Pre = ({ value }: { readonly value?: unknown }) => (
  <pre>{value ? jstr(value) : 'empty value'}</pre>
)
