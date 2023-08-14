import { cn } from '../utils'
import React from 'react'

export const DTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // @TODO: have variants for width?
  <div ref={ref} className={cn('table w-full', className)} {...props} />
))
DTable.displayName = 'DTable'

export const DTHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('table-header-group', className)} {...props} />
))
DTHeader.displayName = 'DTHeader'

export const DTRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('table-row m-0 border-t p-0 even:bg-muted', className)}
    {...props}
  />
))
DTRow.displayName = 'DTRow'

export const DTHead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'table-cell border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
      className,
    )}
    {...props}
  />
))
DTHead.displayName = 'DTHead'

export const DTBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('table-row-group', className)} {...props} />
))
DTBody.displayName = 'DTBody'

export const DTCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'table-cell border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
      className,
    )}
    {...props}
  />
))
DTCell.displayName = 'DTCell'

export const DTCaption = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'table-caption mt-4 text-sm text-muted-foreground',
      className,
    )}
    {...props}
  />
))
DTCaption.displayName = 'DTCaption'

export const DTFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'table-footer-group bg-primary font-medium text-primary-foreground',
      className,
    )}
    {...props}
  />
))
DTFooter.displayName = 'DTFooter'
