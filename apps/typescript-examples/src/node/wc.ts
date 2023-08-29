import type { PathLike } from 'node:fs'
import fs from 'node:fs/promises'

import { cast } from '@srtp/core'
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
