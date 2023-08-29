import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import type { Session } from 'next-auth'
import { z } from 'zod'
import type { Response } from './response'
import { response } from './response'

export interface CtxOrReq {
  req?: NextApiRequest
  ctx?: GetServerSidePropsContext
}

type Result<T> = Promise<T>

type HandlerFn<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) => Result<T>

const HTTPMethods = z.enum(['get', 'post', 'put', 'patch', 'delete'])
type HTTPMethods = z.infer<typeof HTTPMethods>

type Protected = { readonly protect: boolean }

type HTTPRoutes = {
  [K in HTTPMethods]: <T>(fn: HandlerFn<T>) => Omit<HTTPRoutes, K>
}

interface Http extends HTTPRoutes {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>
}

type GetSession = (this: void, ctx: CtxOrReq) => Promise<Session | null>
class Handler {
  private readonly methods: Partial<Record<HTTPMethods, HandlerFn<any>>> = {}
  private readonly protect: boolean
  private readonly getSession: GetSession
  constructor(
    getSession: GetSession,
    { protect }: Protected = { protect: false },
  ) {
    this.protect = protect
    this.getSession = getSession
    this.ctor()
  }

  private readonly ctor = () => {
    for (const method of HTTPMethods.options) {
      const h = this.handlerFn as any
      h[method.toLowerCase()] = (fn: HandlerFn<any>) => {
        this.methods[method] = fn
        return h
      }
    }
  }

  private readonly handlerFn = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    let session: Session

    if (this.protect) {
      const s = await this.getSession({ req })

      if (s) {
        session = s
      } else {
        return res.status(401).json({ error: 'Not Authenticated' })
      }
    }

    const method =
      this.methods[HTTPMethods.parse(req.method?.toLocaleLowerCase())]

    const result: Response<any> = method
      ? await response(() => method(req, res, session))
      : {
          status: 400,
          json: { error: `Unsupported method: ${req.method ?? 'unknown'}` },
        }

    return res.status(result.status).send(result.json)
  }

  handler() {
    return this.handlerFn
  }
}

export const fns = (getSession: GetSession) => {
  const api = (): Http => new Handler(getSession).handler() as any
  const secured = (): Http => new Handler(getSession, { protect: true }) as any

  return { api, secured }
}
