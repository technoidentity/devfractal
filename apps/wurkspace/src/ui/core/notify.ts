import type { TypeOptions } from 'react-toastify'
import { toast } from 'react-toastify'

export const notify = (text: string, type: TypeOptions) => {
  toast(text, { type })
}
