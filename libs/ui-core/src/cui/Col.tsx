import React from 'react'

import { cn } from '../utils'

import type { GridClassesMapping } from './gridStyles'
import { colSpan, colSpanLg, colSpanMd, colSpanSm } from './gridStyles'

function getColSpan<T extends GridClassesMapping>(
  numColSpan: keyof T | undefined,
  colSpanMapping: T,
): string {
  if (!numColSpan) {
    return ''
  }
  if (!Object.keys(colSpanMapping).includes(String(numColSpan))) {
    return ''
  }

  return colSpanMapping[numColSpan] as string
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  numColSpan?: keyof typeof colSpan
  numColSpanSm?: keyof typeof colSpanSm
  numColSpanMd?: keyof typeof colSpanMd
  numColSpanLg?: keyof typeof colSpanLg
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const {
    numColSpan = 1,
    numColSpanSm,
    numColSpanMd,
    numColSpanLg,
    children,
    className,
    ...other
  } = props

  const getColSpanClassNames = () => {
    const spanBase = getColSpan(numColSpan, colSpan)
    const spanSm = getColSpan(numColSpanSm, colSpanSm)
    const spanMd = getColSpan(numColSpanMd, colSpanMd)
    const spanLg = getColSpan(numColSpanLg, colSpanLg)

    return cn(spanBase, spanSm, spanMd, spanLg)
  }

  return (
    <div ref={ref} className={cn(getColSpanClassNames(), className)} {...other}>
      {children}
    </div>
  )
})

Col.displayName = 'Col'
