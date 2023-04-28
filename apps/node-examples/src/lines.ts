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
