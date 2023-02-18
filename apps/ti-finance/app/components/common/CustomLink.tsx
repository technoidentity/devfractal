/* eslint-disable jsx-a11y/anchor-has-content */
import type { NavLinkProps } from '@mantine/core'
import { NavLink } from '@mantine/core'
import type { NavLinkProps as RemixNavLinkProps } from '@remix-run/react'
import { NavLink as RemixNavLink } from '@remix-run/react'

export type CustomLinkProps = RemixNavLinkProps & {
  uiProps?: NavLinkProps
}

export function CustomLink({ uiProps, ...props }: CustomLinkProps) {
  return (
    <RemixNavLink {...props}>
      {({ isActive }) => <NavLink {...uiProps} active={isActive} />}
    </RemixNavLink>
  )
}
