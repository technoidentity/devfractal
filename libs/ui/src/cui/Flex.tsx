import React from 'react'

import { cn } from '../utils'

export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse'

const flexDirectionClassNames: { [key in FlexDirection]: string } = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection
  children: React.ReactNode
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const {
      direction: flexDirection = 'row',
      children,
      className,
      ...other
    } = props

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full',
          flexDirectionClassNames[flexDirection],
          className,
        )}
        {...other}
      >
        {children}
      </div>
    )
  },
)

Flex.displayName = 'Flex'

export const HStack = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const { className, ...other } = props

    return <Flex ref={ref} direction="row" className={className} {...other} />
  },
)

export const VStack = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const { className, ...other } = props

    return <Flex ref={ref} direction="col" className={className} {...other} />
  },
)
