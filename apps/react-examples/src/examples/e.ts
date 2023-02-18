import { z } from 'zod'
import { ensure, is } from '@srtp/core'

const Tag = z.union([z.string(), z.function()])
type Tag = z.infer<typeof Tag>

type Props = Record<string, unknown> & { children?: Children }

const Props: z.ZodType<Props> = z.lazy(() =>
  z.intersection(
    z.record(z.string(), z.unknown()),
    z.object({ children: Children }),
  ),
)

type Element = { tag: string | Function; props: Props }
const Element: z.ZodType<Element> = z.object({ tag: Tag, props: Props })

const Children = z.union([z.array(Element), z.string()])
type Children = z.infer<typeof Children>

export function e(
  tag: string | Function,
  ...rest:
    | [attrs: Record<string, unknown>, children: Element[] | string]
    | [attrs: Record<string, unknown>]
    | [children: Element[] | string]
    | []
): Element {
  let props: Props
  if (rest.length === 0) {
    props = {}
  } else if (rest.length === 2) {
    const [attrs, children] = rest
    props = { ...attrs, children }
  } else if (is(Children, rest[0])) {
    const [attrs] = rest
    props = { children: attrs }
  } else {
    const [attrs] = rest
    props = attrs
  }

  return { tag, props }
}

const AttrValue = z.union([z.string(), z.number(), z.boolean()])
type AttrValue = z.infer<typeof AttrValue>

// const Attr = z.record(z.string(), AttrValue)

function hyphenate(s: string): string {
  return s
    .split('')
    .map(s => (s === s.toUpperCase() ? `-${s.toLowerCase()}` : s))
    .join('')
}

function renderStyle(attrs: Record<string, AttrValue>): string {
  return `style="${Object.entries(attrs)
    .map(([k, v]) => `${hyphenate(k)}:${v.toString()}`)
    .join(';')}"`
}

function renderAttributes(attrs: Record<string, unknown>) {
  if (attrs === undefined || Object.keys(attrs).length === 0) {
    return ''
  }

  return ` ${Object.entries(attrs)
    .map(([k, v]) => {
      if (k === 'style') {
        ensure(z.record(z.string(), AttrValue), v)
        return renderStyle(v)
      }
      ensure(AttrValue, v)
      return `${hyphenate(k)}="${v.toString()}"`
    })
    .join(' ')}`
}

function renderChildren(children: readonly Element[] | string): string {
  return is(z.string(), children)
    ? children
    : children.map(c => renderToString(c)).join('\n')
}

export function renderToString(el: Element): string {
  const {
    tag,
    props: { children, ...props },
  } = el

  return is(z.string(), tag)
    ? `<${tag}${renderAttributes(props)}${
        children ? `>\n  ${renderChildren(children)}\n</${tag}>` : '/>'
      }`
    : renderToString(tag(props))
}

export function render(el: Element, root: any) {
  root.innerHTML = renderToString(el)
}

export const El = () =>
  e('div', {}, [
    e(
      'span',
      {
        className: 'foo',
        style: { color: 'red', backgroundColor: 'blue' },
      },
      'hello world',
    ),
    e('br'),
    e('span', 'hello world'),
  ])

// type Count = { count: number }
// type Action = { type: 'increment' | 'decrement' }

// const reducer = (state: Count, action: Action) => {
//   return state
// }

// const store = createStore(reducer, { count: 1 })

// const handlers = {
//   increment() {
//     store.dispatch({ type: 'increment' })
//   },
//   decrement() {
//     store.dispatch({ type: 'decrement' })
//   },
// }

// store.subscribe(() => {
//   render(e(El, { handlers }), document.getElementById('root')!)
// })
