import React from 'react'

import { cn } from '../utils'

export const Container = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('container mx-auto p-4 min-h-screen', className)}
    {...props}
  />
))
