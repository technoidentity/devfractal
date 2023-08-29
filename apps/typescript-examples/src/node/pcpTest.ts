import { exec } from 'node:child_process'
import fs from 'node:fs'

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
