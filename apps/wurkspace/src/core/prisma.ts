import { PrismaClient } from '@prisma/client'

let db: PrismaClient

declare global {
  // eslint-disable-next-line no-var
  var prismaDb: PrismaClient | undefined
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
  db.$connect().catch(err => console.error(err))
} else {
  if (!global.prismaDb) {
    const debugPrismaDb = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        // {
        //   emit: 'stdout',
        //   level: 'error',
        // },
        // {
        //   emit: 'stdout',
        //   level: 'warn',
        // },
        // {
        //   emit: 'stdout',
        //   level: 'info',
        // },
      ],
    })

    // debugPrismaDb.$on('query', e => {
    //   console.log(`Query:  ${e.query}`)
    //   console.log(`Duration:  ${e.duration} ms`)
    // })

    debugPrismaDb.$connect().catch(err => console.error(err))
    global.prismaDb = debugPrismaDb
  }
  db = global.prismaDb
}

export { db as prisma }
