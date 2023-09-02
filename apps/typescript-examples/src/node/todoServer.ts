import type { Server, ServerResponse } from 'node:http'
import { createServer } from 'node:http'

import { cast, isDefined } from '@srtp/core'
import { filter$, iterSlice$, pipe, toArray } from '@srtp/fn'
import qs from 'query-string'
import invariant from 'tiny-invariant'
import { z } from 'zod'

import { PostTodo, Todo, TodoID } from './todoSpec'

const todos: Todo[] = [
  { id: 1, title: 'Learn TypeScript', completed: false },
  { id: 2, title: 'Build a REST API', completed: false },
]

let currentId = todos.length

const Method = z.enum(['GET', 'POST', 'PUT', 'DELETE'])

const Query = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  title: z.string().optional(),
  completed: z.boolean().optional(),
})

function getTodos(url: URL) {
  const { limit, page, title, completed } = pipe(
    url.searchParams.entries(),
    Object.fromEntries,
    Query.parse,
  )

  let result = todos as Iterable<Todo>

  if (isDefined(title)) {
    result = filter$(result, todo =>
      todo.title.toLowerCase().includes(title.toLowerCase()),
    )
  }

  if (isDefined(completed)) {
    result = filter$(result, todo => todo.completed === completed)
  }

  if (isDefined(page) && isDefined(limit)) {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    result = iterSlice$(result, startIndex, endIndex)
  }

  return toArray(result)
}

function sendJson(
  res: ServerResponse,
  body: unknown,
  statusCode: number = 200,
) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = statusCode
  res.end(JSON.stringify(body))
}

function sendError(
  res: ServerResponse,
  error: unknown,
  statusCode: number = 400,
) {
  res.statusCode = statusCode

  invariant(error instanceof Error, 'Error must be an instance of Error')
  res.end(error.message)
}

function parseBody(
  req: NodeJS.ReadableStream,
  spec: z.ZodTypeAny,
  cb: (err: Error | null, result?: any) => void,
) {
  let body = ''
  req.on('data', chunk => (body += chunk.toString()))
  req.on('end', () => cb(null, cast(spec, qs.parse(body))))
  req.on('error', cb)
}

const server: Server = createServer((req, res) => {
  try {
    invariant(req.url, 'URL is required')

    const parsedUrl = new URL(req.url)
    const method = cast(Method, req.method)
    const pathname = cast(z.string(), parsedUrl.pathname)

    invariant(pathname.startsWith('/'), 'Path must start with /')

    if (method === 'GET' && pathname === '/todos') {
      try {
        sendJson(res, getTodos(parsedUrl))
      } catch (err) {
        sendError(res, err as Error)
      }
    } else if (method === 'POST' && pathname === '/todos') {
      parseBody(req, PostTodo, (err, body) => {
        if (err) {
          sendError(res, err)
        } else {
          const newTodo = { ...body, id: ++currentId }
          todos.push(newTodo)
          sendJson(res, newTodo, 201)
        }
      })
    } else if (method === 'PUT' && /^\/todos\/\d+$/.test(pathname)) {
      try {
        const todoID = cast(TodoID, pathname.split('/')[2])

        parseBody(req, Todo, (err, body) => {
          if (err) {
            sendError(res, err)
          } else {
            try {
              invariant(todoID === body.id, 'Todo ID must match')
              const todoIndex = todos.findIndex(todo => todo.id === body.id)
              invariant(todoIndex !== -1, 'Todo not found')

              todos[todoIndex] = body
              sendJson(res, body)
            } catch (err) {
              sendError(res, err as Error)
            }
          }
        })
      } catch (err) {
        sendError(res, err as Error)
      }
    } else if (method === 'DELETE' && /^\/todos\/\d+$/.test(pathname)) {
      try {
        const todoID = cast(TodoID, pathname.split('/')[2])

        const todoIndex = todos.findIndex(todo => todo.id === todoID)
        invariant(todoIndex !== -1, 'Todo not found')

        todos.splice(todoIndex, 1)
        sendJson(res, null, 204)
      } catch (err) {
        sendError(res, err as Error)
      }
    }
  } catch (e) {
    sendError(res, e as Error, 500)
  }
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})
