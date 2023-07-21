import type { RouteObject } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

export const RootIndex = () => (
  <ul>
    <li>
      <RouterLink to="about">About Us</RouterLink>
    </li>
    <li>
      <RouterLink to="authors">Authors</RouterLink>
    </li>
  </ul>
)

export const rootIndexRouter: RouteObject = {
  index: true,
  element: <RootIndex />,
}
