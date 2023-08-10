import React from 'react'

import { cn } from '@/core'
import { forwardRef } from 'devfractal'

export type BoxProps<T extends keyof JSX.IntrinsicElements> =
  React.ComponentProps<T> & { as?: T }

function BoxComponent<T extends keyof JSX.IntrinsicElements = 'div'>(
  { as, className, ...props }: BoxProps<T>,
  ref: React.Ref<React.ElementRef<T>>,
): JSX.Element {
  const Component = (as ?? 'div') as any
  return <Component {...props} ref={ref} className={cn(className)} />
}
BoxComponent.displayName = 'Box'

export const Box = forwardRef(BoxComponent)
