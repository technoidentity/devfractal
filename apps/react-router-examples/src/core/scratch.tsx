import { int, isObject } from '@srtp/spec'
import { z } from 'zod'
import type { UnionToIntersection } from '@srtp/core'
import type { QueryFunction } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import qs from 'query-string'
import axios from 'redaxios'
// @TODO: get it from validator
type ZodPrimitive = z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodDate

export type Segments = ReadonlyArray<string | Record<string, ZodPrimitive>>
export const segments = <T extends Segments>(...args: T) => args

type ParamsRawSchema_<Path extends Segments> = UnionToIntersection<
  {
    [K in keyof Path]: Path[K] extends string ? never : Path[K]
  }[number]
>

type Params_<Path extends ParamsRawSchema_<any>> = {
  [K in keyof Path]: z.infer<Path[K]>
}

type ParamsSpec<Paths extends Segments> = Params_<ParamsRawSchema_<Paths>>

// type ParamsValue<Path extends Segments> = z.infer<z.ZodObject<ParamsSpec<Path>>>

export function paramsSpec<Paths extends Segments>(
  paths: Paths,
): ParamsSpec<Paths> {
  let result = {} as any
  for (const path of paths) {
    if (isObject(path)) {
      result = { result, ...path }
    }
  }

  return result
}

function key(paths: Segments): string[] {
  return paths.flatMap(e =>
    isObject(e) ? Object.keys(e).map(k => `:${k}`) : [e],
  )
}

// function keyfn<Path extends Segments>(
//   paths: Path,
// ): (params: ParamsSpec<Path>) => string[] {
//   const keys = key(paths)

//   return params => {
//     return keys.map(k => (k.startsWith(':') ? params[k] : k))
//   }
// }

type QueryArgs<Ep extends Endpoint> = {
  path: ParamsSpec<Ep['path']>
  query: z.infer<Ep['request']>
  fetcher: QueryFunction<z.infer<Ep['response']>>
}

export function createEndPointQuery<Ep extends Endpoint>(endpoint: Ep) {
  return (options: QueryArgs<Ep>) => {
    const path = flink<Ep['path']>(endpoint.path)(options.path)
    const query = qs.stringify(options.query)
    const url = `${path}?${query}`
    return useQuery({
      queryKey: [path, query],
      queryFn: () => axios.get(url),
    })
  }
}

function route(paths: Segments): string {
  const segments = paths.map(e =>
    isObject(e) ? `:${Object.keys(e).join('/:')}` : `${e}`,
  )

  return `/${segments.join('/')}`
}

function routes<Paths extends Record<string, Segments>>(
  paths: Paths,
): { readonly [K in keyof Paths]: string } {
  const result = {} as any
  for (const [key, path] of Object.entries(paths)) {
    result[key] = route(path)
  }

  return result
}

function flink<Paths extends Segments>(
  path: Paths,
): (params: ParamsSpec<Paths>) => string {
  return params => {
    let url = route(path)
    for (const [k, v] of Object.entries(params)) {
      const value = v as string
      url = url.replace(`:${k}`, `${value}`)
    }
    return url
  }
}

type FLinks<Paths extends Record<string, Segments>> = {
  readonly [K in keyof Paths]: (params: ParamsSpec<Paths[K]>) => string
}

function flinks<Paths extends Record<string, Segments>>(
  paths: Paths,
): FLinks<Paths> {
  const result = {} as any
  for (const [key, path] of Object.entries(paths)) {
    result[key] = flink(path)
  }

  return result
}

export function fkey<Paths extends Segments>(
  path: Paths,
): (params: ParamsSpec<Paths>) => string {
  return params => {
    let url = route(path)
    for (const [k, v] of Object.entries(params)) {
      const value = v as string
      url = url.replace(`:${k}`, `${value}`)
    }
    return url
  }
}

const paths = {
  todos: [
    'todos',
    { id: z.number() },
    { edit: z.boolean(), bar: z.string() },
    'foo',
  ],
  todosCreate: ['todos', { create: z.string() }],
} as const

console.log(routes(paths).todos)
console.log(flinks(paths).todos({ id: 1, edit: false, bar: 'bar' }))

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
type Endpoint<
  Path extends Segments = Segments,
  Response extends z.AnyZodObject = z.AnyZodObject,
  Request extends z.AnyZodObject = z.AnyZodObject,
> = {
  path: Path
  method: Method
  response: Response
  request: Request // query for GET, body for others
}

export function createEndpointMutation<Ep extends Endpoint>(endpoint: Ep) {
  return (path: ParamsSpec<Ep['path']>) => {
    const key = flink<Ep['path']>(endpoint.path)(path)
    return useMutation({
      mutationFn: () => {
        return axios[endpoint.method](key)
      },
    })
  }
}

type Endpoints = Record<string, Endpoint>

const endpoints: Endpoints = {
  todos: {
    path: ['todos', { id: z.number() }, { edit: z.boolean() }, 'foo'] as const,
    method: 'get',
    request: z.object({ id: z.number() }),
    response: z.object({ id: z.number() }),
  } as const,

  todosCreate: {
    path: ['todos', { create: z.string() }] as const,
    method: 'post',
    request: z.object({ id: z.number() }),
    response: z.object({ id: z.number() }),
  } as const,
} as const

type API<Ep extends Endpoints> = {
  readonly [K in keyof Ep]: (
    path: ParamsSpec<Ep[K]['path']>,
    query: z.infer<Ep[K]['request']>,
  ) => z.infer<Ep[K]['response']>
}

function createEndpoints<Ep extends Endpoints>(endpoints: Ep, api: API<Ep>) {}

const api = createEndpoints(endpoints, {
  todos(path, query) {
    const id = path.id
    const edit = path.edit
    const qid = query.id

    return { id: edit ? id : qid }
  },
  todosCreate(path, query) {
    const create = path.create
    const qid = query.id

    return { id: qid + int(create) }
  },
})

type Queries<Ep extends Endpoints> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'GET' ? K : never]: Ep[K]
}

type Mutations<Ep extends Endpoints> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'GET' ? never : K]: Ep[K]
}

// function createClientEndpoints<Ep extends Endpoints>(
//   endpoints: Ep,
// ): {
//   readonly queries: Queries<Ep>
//   readonly mutations: Mutations<Ep>
// } {
//   const queries = {} as any
//   const mutations = {} as any
//   for (const [key, endpoint] of Object.entries(endpoints)) {
//     if (endpoint.method === 'GET') {
//       queries[key] = (path: any, query: any) => ({

//     } else {
//       mutations[key] = endpoint
//     }
//   }

//   return { queries, mutations }
// }

type TodoQueries = Queries<typeof endpoints>
type TodoMutations = Mutations<typeof endpoints>

const tq: TodoQueries = { todos: endpoints.todos }
const tm: TodoMutations = { todosCreate: endpoints.todosCreate }
