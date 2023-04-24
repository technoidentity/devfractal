import type { Server, ServerResponse } from 'node:http'
import { createServer } from 'node:http'
import * as querystring from 'node:querystring'
import * as url from 'node:url'
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

function getTodos(url: url.UrlWithParsedQuery) {
  const { limit, page, title, completed } = Query.parse(url.query)

  let result = todos

  if (title) {
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(title.toLowerCase()),
    )
  }

  if (completed !== undefined) {
    result = result.filter(todo => todo.completed === completed)
  }

  if (page && limit) {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    result = result.slice(startIndex, endIndex)
  }

  return result
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

function sendError(res: ServerResponse, error: Error, statusCode: number) {
  res.statusCode = statusCode
  res.end(error.message)
}

function parseBody(
  req: NodeJS.ReadableStream,
  spec: z.ZodTypeAny,
  cb: (err: Error | null, result?: any) => void,
) {
  let body = ''
  req.on('data', chunk => (body += chunk.toString()))
  req.on('end', () => cb(null, spec.parse(querystring.parse(body))))
  req.on('error', cb)
}

const server: Server = createServer((req, res) => {
  try {
    invariant(req.url, 'URL is required')

    const parsedUrl = url.parse(req.url, true)
    const method = Method.parse(parsedUrl)
    const pathname = z.string().parse(parsedUrl.pathname)

    invariant(pathname.startsWith('/'), 'Path must start with /')

    if (method === 'GET' && pathname === '/todos') {
      try {
        sendJson(res, getTodos(parsedUrl))
      } catch (err) {
        sendError(res, err as Error, 400)
      }
    } else if (method === 'POST' && pathname === '/todos') {
      parseBody(req, PostTodo, (err, body) => {
        if (err) {
          sendError(res, err, 400)
        } else {
          const newTodo = { ...body, id: ++currentId }
          todos.push(newTodo)
          sendJson(res, newTodo, 201)
        }
      })
    } else if (method === 'PUT' && /^\/todos\/\d+$/.test(pathname)) {
      try {
        const todoID = TodoID.parse(pathname.split('/')[2])

        parseBody(req, Todo, (err, body) => {
          if (err) {
            sendError(res, err, 400)
          } else {
            try {
              invariant(todoID === body.id, 'Todo ID must match')
              const todoIndex = todos.findIndex(todo => todo.id === body.id)
              invariant(todoIndex !== -1, 'Todo not found')

              todos[todoIndex] = body
              sendJson(res, body)
            } catch (err) {
              sendError(res, err as Error, 400)
            }
          }
        })
      } catch (err) {
        sendError(res, err as Error, 400)
      }
    } else if (method === 'DELETE' && /^\/todos\/\d+$/.test(pathname)) {
      try {
        const todoID = TodoID.parse(pathname.split('/')[2])

        const todoIndex = todos.findIndex(todo => todo.id === todoID)
        invariant(todoIndex !== -1, 'Todo not found')

        todos.splice(todoIndex, 1)
        sendJson(res, null, 204)
      } catch (err) {
        sendError(res, err as Error, 400)
      }
    }
  } catch (e) {
    sendError(res, e as Error, 500)
  }
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})
