import { Loader2 } from 'lucide-react'
import { cn } from '../utils'

export type LoadingProps = Readonly<{
  className?: string
  loader?: React.ReactNode
}>

export const Loading = (props: LoadingProps) => (
  <div
    className={cn(
      'flex justify-center items-center h-full w-full',
      props.className,
    )}
  >
    {props.loader ?? <Loader2 className="h-1/3 w-1/3 animate-spin" />}
  </div>
)
