import { Boundary, type BoundaryProps } from './Boundary'

export type ReactProviderProps = BoundaryProps

export function ReactProvider(props: ReactProviderProps) {
  return <Boundary {...props} />
}
