import { Outlet } from '@remix-run/react'

export const CoursePage = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default CoursePage
