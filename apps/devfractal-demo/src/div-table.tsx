import { cn } from '@/core'
import React from 'react'

export const Table = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // @TODO: have variants for width?
  <div ref={ref} className={cn('table w-full', className)} {...props} />
))
Table.displayName = 'Table'

export const TableHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('table-header-group', className)} {...props} />
))
TableHeader.displayName = 'TableHead'

export const TableRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('table-row m-0 border-t p-0 even:bg-muted', className)}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

export const TableHead = React.forwardRef<
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
TableHead.displayName = 'TableHead'

export const TableBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('table-row-group', className)} {...props} />
))
TableBody.displayName = 'TableBody'

export const TableCell = React.forwardRef<
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
TableCell.displayName = 'TableCell'

export const TableCaption = React.forwardRef<
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
TableCaption.displayName = 'TableCaption'

export const TableFooter = React.forwardRef<
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
TableFooter.displayName = 'TableFooter'
