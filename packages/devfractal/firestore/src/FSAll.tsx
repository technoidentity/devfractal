import React from 'react'
import { SafeRoute } from 'srtp-core'
import { Get } from 'srtp-crud'
import { ObjC, Props, TypeOf } from 'srtp-utils'
import { FirstoreAPI } from './firestoreRest'

interface ChildrenProps<
  Opt extends Props,
  Req extends Props,
  ID extends keyof TypeOf<ObjC<Opt, Req>>
> {
  readonly api: FirstoreAPI<Opt, Req, ID>
  readonly list: React.FC<FSAllComponentProps<TypeOf<ObjC<Opt, Req>>>>
}

function Children<
  Opt extends Props,
  Req extends Props,
  ID extends keyof TypeOf<ObjC<Opt, Req>>
>({
  api,
  list: Component,
}: //   queryFn = defaultQueryFn,
ChildrenProps<Opt, Req, ID>): JSX.Element {
  async function asyncFn(): Promise<ReadonlyArray<TypeOf<ObjC<Opt, Req>>>> {
    return api.many()
  }

  return <Get asyncFn={asyncFn}>{data => <Component data={data} />}</Get>
}

export interface FSAllComponentProps<T> {
  readonly data: readonly T[]
}

export interface FSAllProps<
  Opt extends Props,
  Req extends Props,
  ID extends keyof TypeOf<ObjC<Opt, Req>>
> extends ChildrenProps<Opt, Req, ID> {
  readonly path: string
}

export function FSAll<
  Opt extends Props,
  Req extends Props,
  ID extends keyof TypeOf<ObjC<Opt, Req>>
>({ path, ...props }: FSAllProps<Opt, Req, ID>): JSX.Element {
  return path ? (
    <SafeRoute path={path} render={() => <Children {...props} />} />
  ) : (
    <Children {...props} />
  )
}
