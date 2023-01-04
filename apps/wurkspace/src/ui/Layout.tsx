import React from 'react'
import { SideBar } from './sidebar'

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="lg:fixed sm:fixed z-20">
      <SideBar />
    </div>
    <main>{children}</main>
  </>
)
