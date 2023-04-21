type RouteParams<T extends string> =
  T extends `${infer _}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof RouteParams<Rest>]: string }
    : T extends `${infer _}:${infer Param}`
    ? { [K in Param]: string }
    : {}

const route = '/blog/:year/:foo/:month/:day/bar/:slug/:fizz'
type Route = typeof route
type Params = RouteParams<Route> // { year: string, month: string, day: string, slug: string }

function foo<T extends string>(route: T): RouteParams<T> {
  return route.split('/').reduce((acc, part) => {
    if (part.startsWith(':')) {
      return { ...acc, [part.slice(1)]: '' }
    }
    return acc
  }, {}) as RouteParams<T>
}

function replaceParams<T extends string>(
  route: T,
  params: RouteParams<T>,
): string[] {
  const result: string[] = []
  for (const part of route.split('/')) {
    if (part.startsWith(':')) {
      result.push((params as any)[part.slice(1)])
    } else {
      result.push(part)
    }
  }

  return result
}
