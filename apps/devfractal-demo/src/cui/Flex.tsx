import React from 'react'

import { cn } from '@core'

export type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse'

const justifyContentClassNames: { [key in JustifyContent]: string } = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const alignItemsClassNames: { [key in AlignItems]: string } = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const flexDirectionClassNames: { [key in FlexDirection]: string } = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection
  justify?: JustifyContent
  align?: AlignItems
  children: React.ReactNode
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const {
      direction: flexDirection = 'row',
      justify: justifyContent = 'between',
      align: alignItems = 'center',
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
          justifyContentClassNames[justifyContent],
          alignItemsClassNames[alignItems],
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
