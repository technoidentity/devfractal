import React, { useMemo } from 'react'

import type { GridClassesMapping } from './styles'
import { gridCols, gridColsLg, gridColsMd, gridColsSm } from './styles'
import { cn } from '@core'

function getGridCols<T extends GridClassesMapping>(
  numCols: keyof T | undefined,
  gridColsMapping: T,
): string {
  if (!numCols) {
    return ''
  }

  if (!Object.keys(gridColsMapping).includes(String(numCols))) {
    return ''
  }

  return gridColsMapping[numCols]
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  numItems?: keyof typeof gridCols
  numItemsSm?: keyof typeof gridColsSm
  numItemsMd?: keyof typeof gridColsMd
  numItemsLg?: keyof typeof gridColsLg
  children: React.ReactNode
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    numItems = 1,
    numItemsSm,
    numItemsMd,
    numItemsLg,
    children,
    className,
    ...other
  } = props

  const colClassNames = useMemo(() => {
    const colsBase = getGridCols(numItems, gridCols)
    const colsSm = getGridCols(numItemsSm, gridColsSm)
    const colsMd = getGridCols(numItemsMd, gridColsMd)
    const colsLg = getGridCols(numItemsLg, gridColsLg)

    return cn(colsBase, colsSm, colsMd, colsLg)
  }, [numItems, numItemsSm, numItemsMd, numItemsLg])

  return (
    <div ref={ref} className={cn('grid', colClassNames, className)} {...other}>
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export default Grid
