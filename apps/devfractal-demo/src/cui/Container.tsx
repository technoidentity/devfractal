import { cn } from '@core'
import React from 'react'

export const Container = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('container mx-auto px-4', className)}
    {...props}
  />
))
