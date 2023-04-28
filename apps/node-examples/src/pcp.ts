/* eslint-disable no-loop-func */
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
