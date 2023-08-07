import React from 'react'

import { cn } from '@/core'

export const Box = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bg-background text-foreground', className)}
    {...props}
  />
))

Box.displayName = 'Card'

export const Foo = () => (
  <Box>
    <Box>1</Box>
    <Box>2</Box>
    <Box>3</Box>
  </Box>
)
