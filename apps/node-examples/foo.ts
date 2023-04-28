import { cast } from '@srtp/spec'
import { createReadStream, createWriteStream, type PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export async function cat(srcDir: string, dest: PathLike) {
  const writer = createWriteStream(dest, { flags: 'a+' })

  const files = await fs.readdir(srcDir)

  for await (const file of files) {
    const readFile = path.join(srcDir, file)
    if (!(await fs.stat(readFile)).isFile()) {
      continue
    }

    try {
      const reader = createReadStream(readFile)
      for await (const chunk of reader) {
        writer.write(chunk)
      }
    } catch (e) {
      console.error(e)
      console.log('Continuing...')
    }
  }
}

const main = async () => {
  invariant(process.argv.length === 4, 'Usage: node cat.js <src> <dest>')
  const [srcDir, dest] = cast(
    z.tuple([z.string(), z.string()]),
    process.argv.slice(2),
  )
  invariant(
    (await fs.stat(srcDir)).isDirectory(),
    'Source directory does not exist',
  )

  await cat(srcDir, dest)
  console.log('Done!')
}

main().catch(console.error)
import fs from 'node:fs'

function closeFiles(fd: number | undefined, fd2?: number) {
  if (fd !== undefined) {
    fs.close(fd, () => {})
  }

  if (fd2 !== undefined) {
    fs.close(fd2, () => {})
  }
}

export function cp(
  src: fs.PathLike,
  dest: fs.PathLike,
  cb: (err: NodeJS.ErrnoException | undefined) => void,
) {
  fs.open(src, 'r', (err, srcFd) => {
    if (err) {
      return cb(err)
    }

    fs.open(dest, 'w', (err, destFd) => {
      if (err) {
        closeFiles(srcFd)
        return cb(err)
      }

      fs.readFile(srcFd, (err, data) => {
        if (err) {
          closeFiles(srcFd)
          return cb(err)
        }

        fs.writeFile(destFd, data, err => {
          if (err) {
            closeFiles(srcFd, destFd)
            return cb(err)
          }

          closeFiles(srcFd, destFd)
          cb(undefined)
        })
      })
    })
  })
}
import { createConnection } from 'node:net'

const port = 8080

const client = createConnection({ port }, () => {
  console.log('Connected to server')
  client.write('Hello, server!')
})

client.on('data', data => {
  const str = data.toString('utf8')
  console.log(`Received: ${str}`)
})

client.on('close', () => {
  console.log('Disconnected from server')
})
import { createServer } from 'node:net'

const server = createServer(socket => {
  console.log('Client connected')

  socket.on('data', data => {
    const str = data.toString('utf8')
    console.log(`Received: ${str}`)
    socket.write(`Echo: ${str}`)
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})
import express from 'express'

const app = express()

const hello = async () => 'Hello World!'

app.get('/', async (_, res) => {
  const message = await hello()
  res.send(message)
})

const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import { cast } from '@srtp/spec'
import { createReadStream, type PathLike } from 'node:fs'
import { argv } from 'node:process'
import { createInterface } from 'node:readline'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function lineReader(src: PathLike) {
  const stream = createReadStream(src)
  return createInterface({
    input: stream,
    crlfDelay: Infinity,
  })
}

const main = async () => {
  invariant(argv.length === 2, 'Usage: node lines.js <file>')
  const file = cast(z.string(), argv[1])
  const lines = lineReader(file)
  let lineNo = 1
  for await (const line of lines) {
    console.log(`[${lineNo}]: ${line.toString()}`)
    lineNo += 1
  }
}

main().catch(console.error)
import { cast } from '@srtp/spec'
import fs from 'node:fs'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function copyFileParallel(
  src: string,
  dest: string,
  bufferSize: number = 1024 * 1024,
  concurrency: number = 5,
  callback: (err: Error | null) => void,
): void {
  let readOffset = 0
  let writeOffset = 0
  let pendingReads = 0
  let errorOccurred = false
  const chunksQueue: Array<{
    offset: number
    chunk: Buffer
    bytesRead: number
  }> = []

  fs.open(src, 'r', (err, srcFd) => {
    if (err) {
      return callback(err)
    }

    fs.open(dest, 'w', (err, destFd) => {
      if (err) {
        fs.close(srcFd, () => {})
        return callback(err)
      }

      function readWrite() {
        if (errorOccurred) {
          return
        }

        const currentReadOffset = readOffset
        readOffset += bufferSize
        pendingReads++

        const chunk = Buffer.alloc(bufferSize)
        fs.read(
          srcFd,
          chunk,
          0,
          bufferSize,
          currentReadOffset,
          (err, bytesRead) => {
            if (err) {
              errorOccurred = true
              return finish(err)
            }

            if (bytesRead === 0) {
              return finish()
            }

            chunksQueue.push({ offset: currentReadOffset, chunk, bytesRead })

            processQueue()
          },
        )
      }

      function processQueue() {
        while (chunksQueue.length > 0) {
          const nextChunk = chunksQueue[0]
          invariant(nextChunk !== undefined)

          if (nextChunk.offset === writeOffset) {
            fs.write(
              destFd,
              nextChunk.chunk,
              0,
              nextChunk.bytesRead,
              writeOffset,
              err => {
                if (err) {
                  errorOccurred = true
                  return finish(err)
                }

                writeOffset += nextChunk.bytesRead
                pendingReads--
                chunksQueue.shift()
                finish()
              },
            )
          } else {
            break
          }
        }
      }

      function finish(err?: Error) {
        if (err && !errorOccurred) {
          errorOccurred = true
          return callback(err)
        }

        if (pendingReads === 0) {
          fs.close(srcFd, () => {})
          fs.close(destFd, () => {})
          if (!errorOccurred) {
            callback(null)
          }
        } else if (!errorOccurred) {
          readWrite()
        }
      }

      for (let i = 0; i < concurrency; i++) {
        readWrite()
      }
    })
  })
}

const main = () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  copyFileParallel(src, dest, 1024 * 1024, 5, err => {
    if (err) {
      console.error(err)
    } else {
      console.log('Done!')
    }
  })
}

main()
import fs from 'node:fs'
import { exec } from 'node:child_process'
import { copyFileParallel } from './pcp'

function createLargeFile(
  filePath: string,
  fileSize: number,
  callback: (err: Error | null) => void,
): void {
  const writeStream = fs.createWriteStream(filePath)
  const chunkSize = 1024 * 1024
  const chunk = Buffer.alloc(chunkSize, 'A')

  function write() {
    let canWriteMore = true

    while (canWriteMore && fileSize > 0) {
      canWriteMore = writeStream.write(chunk)
      fileSize -= chunkSize
    }

    if (fileSize > 0) {
      writeStream.once('drain', write)
    } else {
      writeStream.end()
    }
  }

  writeStream.on('finish', () => {
    callback(null)
  })

  writeStream.on('error', err => {
    callback(err)
  })

  write()
}

function compareFiles(
  file1: string,
  file2: string,
  callback: (err: Error | null) => void,
): void {
  exec(`diff -q ${file1} ${file2}`, (error, _, stderr) => {
    if (error) {
      callback(new Error(`Files are different: ${stderr}`))
    } else {
      callback(null)
    }
  })
}

export function testCopyFileParallel() {
  const sourcePath = 'large_source.txt'
  const destinationPath = 'large_destination.txt'
  const fileSize = 1024 * 1024 * 1024 // 1 GB

  createLargeFile(sourcePath, fileSize, err => {
    if (err) {
      console.error('Error creating large file:', err)
      return
    }

    console.log('Large file created successfully')

    copyFileParallel(sourcePath, destinationPath, 1024 * 1024, 5, err => {
      if (err) {
        console.error('Error copying file:', err)
        return
      }

      console.log('File copied successfully')

      compareFiles(sourcePath, destinationPath, err => {
        if (err) {
          console.error('Error comparing files:', err)
        } else {
          console.log('Files are identical')
        }
      })
    })
  })
}
import { cast } from '@srtp/spec'
import type { PathLike } from 'node:fs'
import * as fs from 'node:fs/promises'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

async function cp(src: PathLike, dest: PathLike) {
  return fs
    .open(src, 'r')
    .then(srcFd =>
      fs
        .open(dest, 'w')
        .then(destFd =>
          fs.readFile(srcFd).then(data => fs.writeFile(destFd, data)),
        ),
    )
}

const main = async () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  await cp(src, dest)
  console.log('Done!')
}

main().catch(console.error)
import { cast } from '@srtp/spec'
import fs from 'node:fs'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function scp(src: fs.PathLike, dest: fs.PathLike) {
  let sfd: number | undefined
  let dfd: number | undefined

  try {
    const sfd = fs.openSync(src, 'r')
    const dfd = fs.openSync(dest, 'w')

    const data = fs.readFileSync(sfd)
    fs.writeFileSync(dfd, data)
  } finally {
    if (sfd) {
      fs.closeSync(sfd)
    }
    if (dfd) {
      fs.closeSync(dfd)
    }
  }
}

const main = async () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  scp(src, dest)
  console.log('Done!')
}

main().catch(console.error)
import Database from 'better-sqlite3'

type Todo = Readonly<{
  id?: number | bigint
  title: string
  completed: boolean
}>

const db = new Database('todos.db')

export const createTodo = (todo: Todo): Todo => {
  const insert = db.prepare(
    "INSERT INTO todos (title, completed, createdAt, updatedAt) VALUES (@title, @completed, datetime('now'), datetime('now'))",
  )
  const result = insert.run(todo)
  return { id: result.lastInsertRowid, ...todo }
}

export const getTodos = () => {
  const select = db.prepare('SELECT * FROM todos')
  return select.all() as Todo[]
}

export const getTodoById = (id: number): Todo | null => {
  const select = db.prepare('SELECT * FROM todos WHERE id = ?')
  const result = select.get(id)
  return result ? (result as Todo) : null
}

export const updateTodo = (id: number, updates: Partial<Todo>): Todo | null => {
  const select = db.prepare('SELECT * FROM todos WHERE id = ?')
  const result = select.get(id)

  if (!result) {
    return null
  }

  const fields = Object.keys(updates)
    .map(key => `${key} = ?`)
    .join(', ')
  const values = Object.values(updates)

  const update = db.prepare(
    `UPDATE todos SET ${fields}, updatedAt = datetime('now') WHERE id = ?`,
  )
  update.run(...values, id)

  return { ...result, ...updates } as Todo
}

export const deleteTodo = (id: number): boolean => {
  const del = db.prepare('DELETE FROM todos WHERE id = ?')
  const result = del.run(id)
  return result.changes > 0
}
import sqlite3 from 'sqlite3'

type Todo = Readonly<{
  id?: number
  title: string
  completed: boolean
}>

const db: sqlite3.Database = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run(
    'CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, completed INTEGER)',
  )
})

export async function getTodos(
  limit: number = 10,
  page: number = 1,
  filter: string = '',
  completed: string | undefined = undefined,
): Promise<Todo[]> {
  const offset = (page - 1) * limit
  const filterQuery = filter !== '' ? `WHERE title LIKE '%${filter}%'` : ''
  const completedQuery =
    completed !== undefined
      ? `AND completed = ${completed === 'true' ? 1 : 0}`
      : ''
  const query = `SELECT * FROM todos ${filterQuery} ${completedQuery} LIMIT ${limit} OFFSET ${offset}`

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows as Todo[])
      }
    })
  })
}

export async function createTodo(
  title: string,
  completed: boolean,
): Promise<Todo> {
  const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)'
  const params = [title, completed ? 1 : 0]
  return new Promise<Todo>(function (resolve, reject) {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          // eslint-disable-next-line no-invalid-this
          id: this.lastID,
          title,
          completed,
        })
      }
    })
  })
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean,
): Promise<Todo> {
  const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?'
  const params = [title, completed ? 1 : 0, id]
  return new Promise<Todo>((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          id,
          title,
          completed,
        })
      }
    })
  })
}

export async function deleteTodo(id: number): Promise<void> {
  const query = 'DELETE FROM todos WHERE id = ?'
  return new Promise<void>((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
import type { Server, ServerResponse } from 'node:http'
import { createServer } from 'node:http'
import qs from 'query-string'

import { filter$, iterSlice$, pipe, toArray } from '@srtp/fn'
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

  if (title !== undefined) {
    result = filter$(result, todo =>
      todo.title.toLowerCase().includes(title.toLowerCase()),
    )
  }

  if (completed !== undefined) {
    result = filter$(result, todo => todo.completed === completed)
  }

  if (page !== undefined && limit != undefined) {
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
  req.on('end', () => cb(null, spec.parse(qs.parse(body))))
  req.on('error', cb)
}

const server: Server = createServer((req, res) => {
  try {
    invariant(req.url, 'URL is required')

    const parsedUrl = new URL(req.url)
    const method = Method.parse(req.method)
    const pathname = z.string().parse(parsedUrl.pathname)

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
        const todoID = TodoID.parse(pathname.split('/')[2])

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
        const todoID = TodoID.parse(pathname.split('/')[2])

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
import { z } from 'zod'

export const TodoID = z.coerce.number().int().positive()
export type TodoID = z.infer<typeof TodoID>

export const Todo = z.object({
  id: TodoID,
  title: z.string(),
  completed: z.coerce.boolean(),
})
export type Todo = z.infer<typeof Todo>

export const PostTodo = Todo.omit({ id: true })
export type PostTodo = z.infer<typeof PostTodo>
import { cast } from '@srtp/spec'
import type { PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import invariant from 'tiny-invariant'
import { z } from 'zod'

const toWords = (s: string) =>
  s.split(/\b/).filter(word => word.trim().length !== 0)

function index(words: readonly string[]) {
  const map = new Map<string, string[]>()
  for (const word of words) {
    const list = map.get(word) ?? []
    list.push(word)
    map.set(word, list)
  }

  return map
}

const countWords = (words: readonly string[]) =>
  new Map([...index(words)].map(([word, list]) => [word, list.length]))

export function words(src: PathLike) {
  return fs
    .open(src, 'r')
    .then(fd => fs.readFile(fd))
    .then(data => data.toString())
    .then(toWords)
}

const main = () => {
  invariant(process.argv.length === 3, 'Usage: node wc.js <file>')
  const file = cast(z.string(), process.argv[2])

  return words(file).then(words => {
    console.log(countWords(words))
  })
}

main().catch(console.error)
import { cast } from '@srtp/spec'
import { createReadStream, createWriteStream, type PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export async function cat(srcDir: string, dest: PathLike) {
  const writer = createWriteStream(dest, { flags: 'a+' })

  const files = await fs.readdir(srcDir)

  for await (const file of files) {
    const rf = path.join(srcDir, file)

    if (!(await fs.stat(rf)).isFile()) {
      continue
    }

    try {
      const reader = createReadStream(rf)
      for await (const chunk of reader) {
        writer.write(chunk)
      }
    } catch (e) {
      console.error(e)
      console.log('Continuing...')
    }
  }
}

const main = async () => {
  console.log(process.argv)
  invariant(process.argv.length === 4, 'Usage: node cat.js <src> <dest>')

  const [srcDir, dest] = cast(
    z.tuple([z.string(), z.string()]),
    process.argv.slice(2),
  )

  invariant(
    (await fs.stat(srcDir)).isDirectory(),
    'Source directory does not exist',
  )

  await cat(srcDir, dest)

  console.log('Done!')
}

main().catch(console.error)
import fs from 'node:fs'

function closeFiles(fd: number | undefined, fd2?: number) {
  if (fd !== undefined) {
    fs.close(fd, () => {})
  }

  if (fd2 !== undefined) {
    fs.close(fd2, () => {})
  }
}

export function cp(
  src: fs.PathLike,
  dest: fs.PathLike,
  cb: (err: NodeJS.ErrnoException | undefined) => void,
) {
  fs.open(src, 'r', (err, srcFd) => {
    if (err) {
      return cb(err)
    }

    fs.open(dest, 'w', (err, destFd) => {
      if (err) {
        closeFiles(srcFd)
        return cb(err)
      }

      fs.readFile(srcFd, (err, data) => {
        if (err) {
          closeFiles(srcFd)
          return cb(err)
        }

        fs.writeFile(destFd, data, err => {
          if (err) {
            closeFiles(srcFd, destFd)
            return cb(err)
          }

          closeFiles(srcFd, destFd)
          cb(undefined)
        })
      })
    })
  })
}
import { createConnection } from 'node:net'

const port = 8080

const client = createConnection({ port }, () => {
  console.log('Connected to server')
  client.write('Hello, server!')
})

client.on('data', data => {
  const str = data.toString('utf8')
  console.log(`Received: ${str}`)
})

client.on('close', () => {
  console.log('Disconnected from server')
})
import { createServer } from 'node:net'

const server = createServer(socket => {
  console.log('Client connected')

  socket.on('data', data => {
    const str = data.toString('utf8')
    console.log(`Received: ${str}`)
    socket.write(`Echo: ${str}`)
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})
import express from 'express'

const app = express()

const hello = async () => 'Hello World!'

app.get('/', async (_, res) => {
  const message = await hello()
  res.send(message)
})

const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import { cast } from '@srtp/spec'
import { createReadStream, type PathLike } from 'node:fs'
import { argv } from 'node:process'
import { createInterface } from 'node:readline'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function lineReader(src: PathLike) {
  const stream = createReadStream(src)
  return createInterface({
    input: stream,
    crlfDelay: Infinity,
  })
}

const main = async () => {
  invariant(argv.length === 2, 'Usage: node lines.js <file>')
  const file = cast(z.string(), argv[1])
  const lines = lineReader(file)
  let lineNo = 1
  for await (const line of lines) {
    console.log(`[${lineNo}]: ${line.toString()}`)
    lineNo += 1
  }
}

main().catch(console.error)
import { cast } from '@srtp/spec'
import fs from 'node:fs'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function copyFileParallel(
  src: string,
  dest: string,
  bufferSize: number = 1024 * 1024,
  concurrency: number = 5,
  callback: (err: Error | null) => void,
): void {
  let readOffset = 0
  let writeOffset = 0
  let pendingReads = 0
  let errorOccurred = false
  const chunksQueue: Array<{
    offset: number
    chunk: Buffer
    bytesRead: number
  }> = []

  fs.open(src, 'r', (err, srcFd) => {
    if (err) {
      return callback(err)
    }

    fs.open(dest, 'w', (err, destFd) => {
      if (err) {
        fs.close(srcFd, () => {})
        return callback(err)
      }

      function readWrite() {
        if (errorOccurred) {
          return
        }

        const currentReadOffset = readOffset
        readOffset += bufferSize
        pendingReads++

        const chunk = Buffer.alloc(bufferSize)
        fs.read(
          srcFd,
          chunk,
          0,
          bufferSize,
          currentReadOffset,
          (err, bytesRead) => {
            if (err) {
              errorOccurred = true
              return finish(err)
            }

            if (bytesRead === 0) {
              return finish()
            }

            chunksQueue.push({ offset: currentReadOffset, chunk, bytesRead })

            processQueue()
          },
        )
      }

      function processQueue() {
        while (chunksQueue.length > 0) {
          const nextChunk = chunksQueue[0]
          invariant(nextChunk !== undefined)

          if (nextChunk.offset === writeOffset) {
            fs.write(
              destFd,
              nextChunk.chunk,
              0,
              nextChunk.bytesRead,
              writeOffset,
              err => {
                if (err) {
                  errorOccurred = true
                  return finish(err)
                }

                writeOffset += nextChunk.bytesRead
                pendingReads--
                chunksQueue.shift()
                finish()
              },
            )
          } else {
            break
          }
        }
      }

      function finish(err?: Error) {
        if (err && !errorOccurred) {
          errorOccurred = true
          return callback(err)
        }

        if (pendingReads === 0) {
          fs.close(srcFd, () => {})
          fs.close(destFd, () => {})
          if (!errorOccurred) {
            callback(null)
          }
        } else if (!errorOccurred) {
          readWrite()
        }
      }

      for (let i = 0; i < concurrency; i++) {
        readWrite()
      }
    })
  })
}

const main = () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  copyFileParallel(src, dest, 1024 * 1024, 5, err => {
    if (err) {
      console.error(err)
    } else {
      console.log('Done!')
    }
  })
}

main()
import fs from 'node:fs'
import { exec } from 'node:child_process'
import { copyFileParallel } from './pcp'

function createLargeFile(
  filePath: string,
  fileSize: number,
  callback: (err: Error | null) => void,
): void {
  const writeStream = fs.createWriteStream(filePath)
  const chunkSize = 1024 * 1024
  const chunk = Buffer.alloc(chunkSize, 'A')

  function write() {
    let canWriteMore = true

    while (canWriteMore && fileSize > 0) {
      canWriteMore = writeStream.write(chunk)
      fileSize -= chunkSize
    }

    if (fileSize > 0) {
      writeStream.once('drain', write)
    } else {
      writeStream.end()
    }
  }

  writeStream.on('finish', () => {
    callback(null)
  })

  writeStream.on('error', err => {
    callback(err)
  })

  write()
}

function compareFiles(
  file1: string,
  file2: string,
  callback: (err: Error | null) => void,
): void {
  exec(`diff -q ${file1} ${file2}`, (error, _, stderr) => {
    if (error) {
      callback(new Error(`Files are different: ${stderr}`))
    } else {
      callback(null)
    }
  })
}

export function testCopyFileParallel() {
  const sourcePath = 'large_source.txt'
  const destinationPath = 'large_destination.txt'
  const fileSize = 1024 * 1024 * 1024 // 1 GB

  createLargeFile(sourcePath, fileSize, err => {
    if (err) {
      console.error('Error creating large file:', err)
      return
    }

    console.log('Large file created successfully')

    copyFileParallel(sourcePath, destinationPath, 1024 * 1024, 5, err => {
      if (err) {
        console.error('Error copying file:', err)
        return
      }

      console.log('File copied successfully')

      compareFiles(sourcePath, destinationPath, err => {
        if (err) {
          console.error('Error comparing files:', err)
        } else {
          console.log('Files are identical')
        }
      })
    })
  })
}
import { cast } from '@srtp/spec'
import type { PathLike } from 'node:fs'
import * as fs from 'node:fs/promises'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

async function cp(src: PathLike, dest: PathLike) {
  return fs
    .open(src, 'r')
    .then(srcFd =>
      fs
        .open(dest, 'w')
        .then(destFd =>
          fs.readFile(srcFd).then(data => fs.writeFile(destFd, data)),
        ),
    )
}

const main = async () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  await cp(src, dest)
  console.log('Done!')
}

main().catch(console.error)
import { cast } from '@srtp/spec'
import fs from 'node:fs'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function scp(src: fs.PathLike, dest: fs.PathLike) {
  let sfd: number | undefined
  let dfd: number | undefined

  try {
    const sfd = fs.openSync(src, 'r')
    const dfd = fs.openSync(dest, 'w')

    const data = fs.readFileSync(sfd)
    fs.writeFileSync(dfd, data)
  } finally {
    if (sfd) {
      fs.closeSync(sfd)
    }
    if (dfd) {
      fs.closeSync(dfd)
    }
  }
}

const main = async () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  scp(src, dest)
  console.log('Done!')
}

main().catch(console.error)
import Database from 'better-sqlite3'

type Todo = Readonly<{
  id?: number | bigint
  title: string
  completed: boolean
}>

const db = new Database('todos.db')

export const createTodo = (todo: Todo): Todo => {
  const insert = db.prepare(
    "INSERT INTO todos (title, completed, createdAt, updatedAt) VALUES (@title, @completed, datetime('now'), datetime('now'))",
  )
  const result = insert.run(todo)
  return { id: result.lastInsertRowid, ...todo }
}

export const getTodos = () => {
  const select = db.prepare('SELECT * FROM todos')
  return select.all() as Todo[]
}

export const getTodoById = (id: number): Todo | null => {
  const select = db.prepare('SELECT * FROM todos WHERE id = ?')
  const result = select.get(id)
  return result ? (result as Todo) : null
}

export const updateTodo = (id: number, updates: Partial<Todo>): Todo | null => {
  const select = db.prepare('SELECT * FROM todos WHERE id = ?')
  const result = select.get(id)

  if (!result) {
    return null
  }

  const fields = Object.keys(updates)
    .map(key => `${key} = ?`)
    .join(', ')
  const values = Object.values(updates)

  const update = db.prepare(
    `UPDATE todos SET ${fields}, updatedAt = datetime('now') WHERE id = ?`,
  )
  update.run(...values, id)

  return { ...result, ...updates } as Todo
}

export const deleteTodo = (id: number): boolean => {
  const del = db.prepare('DELETE FROM todos WHERE id = ?')
  const result = del.run(id)
  return result.changes > 0
}
import sqlite3 from 'sqlite3'

type Todo = Readonly<{
  id?: number
  title: string
  completed: boolean
}>

const db: sqlite3.Database = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run(
    'CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, completed INTEGER)',
  )
})

export async function getTodos(
  limit: number = 10,
  page: number = 1,
  filter: string = '',
  completed: string | undefined = undefined,
): Promise<Todo[]> {
  const offset = (page - 1) * limit
  const filterQuery = filter !== '' ? `WHERE title LIKE '%${filter}%'` : ''
  const completedQuery =
    completed !== undefined
      ? `AND completed = ${completed === 'true' ? 1 : 0}`
      : ''
  const query = `SELECT * FROM todos ${filterQuery} ${completedQuery} LIMIT ${limit} OFFSET ${offset}`

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows as Todo[])
      }
    })
  })
}

export async function createTodo(
  title: string,
  completed: boolean,
): Promise<Todo> {
  const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)'
  const params = [title, completed ? 1 : 0]
  return new Promise<Todo>(function (resolve, reject) {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          // eslint-disable-next-line no-invalid-this
          id: this.lastID,
          title,
          completed,
        })
      }
    })
  })
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean,
): Promise<Todo> {
  const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?'
  const params = [title, completed ? 1 : 0, id]
  return new Promise<Todo>((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          id,
          title,
          completed,
        })
      }
    })
  })
}

export async function deleteTodo(id: number): Promise<void> {
  const query = 'DELETE FROM todos WHERE id = ?'
  return new Promise<void>((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
import type { Server, ServerResponse } from 'node:http'
import { createServer } from 'node:http'
import qs from 'query-string'

import { filter$, iterSlice$, pipe, toArray } from '@srtp/fn'
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

  if (title !== undefined) {
    result = filter$(result, todo =>
      todo.title.toLowerCase().includes(title.toLowerCase()),
    )
  }

  if (completed !== undefined) {
    result = filter$(result, todo => todo.completed === completed)
  }

  if (page !== undefined && limit != undefined) {
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
  req.on('end', () => cb(null, spec.parse(qs.parse(body))))
  req.on('error', cb)
}

const server: Server = createServer((req, res) => {
  try {
    invariant(req.url, 'URL is required')

    const parsedUrl = new URL(req.url)
    const method = Method.parse(req.method)
    const pathname = z.string().parse(parsedUrl.pathname)

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
        const todoID = TodoID.parse(pathname.split('/')[2])

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
        const todoID = TodoID.parse(pathname.split('/')[2])

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
import { z } from 'zod'

export const TodoID = z.coerce.number().int().positive()
export type TodoID = z.infer<typeof TodoID>

export const Todo = z.object({
  id: TodoID,
  title: z.string(),
  completed: z.coerce.boolean(),
})
export type Todo = z.infer<typeof Todo>

export const PostTodo = Todo.omit({ id: true })
export type PostTodo = z.infer<typeof PostTodo>
import { cast } from '@srtp/spec'
import type { PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import invariant from 'tiny-invariant'
import { z } from 'zod'

const toWords = (s: string) =>
  s.split(/\b/).filter(word => word.trim().length !== 0)

function index(words: readonly string[]) {
  const map = new Map<string, string[]>()
  for (const word of words) {
    const list = map.get(word) ?? []
    list.push(word)
    map.set(word, list)
  }

  return map
}

const countWords = (words: readonly string[]) =>
  new Map([...index(words)].map(([word, list]) => [word, list.length]))

export function words(src: PathLike) {
  return fs
    .open(src, 'r')
    .then(fd => fs.readFile(fd))
    .then(data => data.toString())
    .then(toWords)
}

const main = () => {
  invariant(process.argv.length === 3, 'Usage: node wc.js <file>')
  const file = cast(z.string(), process.argv[2])

  return words(file).then(words => {
    console.log(countWords(words))
  })
}

main().catch(console.error)
