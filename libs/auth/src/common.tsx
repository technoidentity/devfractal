import { z } from 'zod'

// @TODO: Make these much better :-)
export const defaultErrorElement = <div>Unknown Error</div>

export const fallback = <div>Loading...</div>

export const PageNotFound = () => <div>PageNotFound</div>

export const AuthUser = z.any()
export type AuthUser = z.infer<typeof AuthUser>
