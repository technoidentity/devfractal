export type Method = 'post' | 'patch' | 'put' | 'delete'

export type MutationDescription<T> = {
  type: Method
  path: string
  payload: T
}

export const ApiDescriptions = {
  post: <T>(path: string, payload: T): MutationDescription<T> => ({
    type: 'post',
    path,
    payload,
  }),

  patch: <T>(path: string, payload: T): MutationDescription<T> => ({
    type: 'patch',
    path,
    payload,
  }),

  put: <T>(path: string, payload: T): MutationDescription<T> => ({
    type: 'put',
    path,
    payload,
  }),

  remove: (path: string): MutationDescription<undefined> => ({
    type: 'delete',
    path,
    payload: undefined,
  }),
}
