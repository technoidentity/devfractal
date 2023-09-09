import React from 'react'

import { cn } from '../utils'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const { className, ...other } = props

    return <div ref={ref} className={cn('flex', className)} {...other} />
  },
)
Flex.displayName = 'Flex'

export const HStack = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const { className, ...other } = props

    return (
      <div ref={ref} className={cn('flex flex-row', className)} {...other} />
    )
  },
)
HStack.displayName = 'HStack'

export const VStack = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const { className, ...other } = props

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...other} />
    )
  },
)
VStack.displayName = 'VStack'
