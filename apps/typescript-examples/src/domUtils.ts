import { notNil } from '@srtp/spec'

export const getElement = (id: string) => notNil(document.getElementById(id))

export const getSelector = (selector: string) =>
  notNil(document.querySelector(selector))

export function appendChildren(
  parent: HTMLElement,
  children: Iterable<HTMLElement>,
) {
  for (const child of children) {
    parent.appendChild(child)
  }
}

export type ElementOptions = Readonly<{
  className?: string
  id?: string
  children?: Iterable<HTMLElement>
}> & {}

export function element(tagName: string, options?: ElementOptions) {
  const e = document.createElement(tagName)
  if (options?.className) {
    e.className = options.className
  }
  if (options?.id) {
    e.id = options.id
  }

  if (options?.children) {
    appendChildren(e, options.children)
  }
  return e
}
