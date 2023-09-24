import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Tasks' }]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h1 className="text-3xl">Welcome to Tasks</h1>
    </div>
  )
}
