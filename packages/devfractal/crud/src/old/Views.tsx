import { FormikHelpers } from 'formik'
import React from 'react'
import { RowClickEvent } from 'srtp-core'
import { empty, Mixed, TypeOf } from 'srtp-utils'
import { Editor, SimpleTable, Viewer } from '../crud'

interface EditProps<T extends Record<string, any>> {
  readonly data: T | (() => Promise<T>)
  onSubmit?(values: T, actions: FormikHelpers<T>): void
}

interface ViewProps<T extends Record<string, any>> {
  readonly data: T | (() => Promise<T>)
}

interface CreateProps<T extends Record<string, any>> {
  onSubmit?(values: T, actions: FormikHelpers<T>): void
}

interface ListProps<T extends Record<string, any>> {
  list(): Promise<readonly T[]>
  onCreate?(): void
  onEdit?(value: RowClickEvent<T>): void
  onDelete?(value: RowClickEvent<T>): void
}

export interface CrudViewsResult<T extends Mixed, ID extends keyof T> {
  readonly List: React.FC<ListProps<TypeOf<T>>>
  readonly Create: React.FC<CreateProps<Omit<TypeOf<T>, ID>>>
  readonly Edit: React.FC<EditProps<TypeOf<T>>>
  readonly View: React.FC<ViewProps<TypeOf<T>>>
}

export function Views<RT extends Mixed, ID extends keyof RT>(
  // cannot pass this to create, as getting type from typeValue is easy,
  // not the other way round
  typeValue: RT,
  id: keyof RT,
): CrudViewsResult<RT, ID> {
  return {
    Create: ({ onSubmit }) => (
      <Editor id={id} data={empty(typeValue)} onSubmit={onSubmit as any} />
    ),

    Edit: ({ data, onSubmit }) => (
      <Editor id={id} data={data} onSubmit={onSubmit} />
    ),

    View: ({ data }) => <Viewer data={data} />,

    List: ({ list, onCreate, onEdit }) => {
      return (
        <div className="container">
          <div className="is-grouped is-grouped-right">
            <button className="is-primary" onClick={onCreate}>
              New
            </button>
          </div>
          <SimpleTable data={list} onRowClicked={onEdit} />
        </div>
      )
    },
  }
}
