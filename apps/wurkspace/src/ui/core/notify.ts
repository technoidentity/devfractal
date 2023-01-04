import { toast, TypeOptions } from 'react-toastify'

export const notify = (text: string, type: TypeOptions) => {
  toast(text, { type })
}
