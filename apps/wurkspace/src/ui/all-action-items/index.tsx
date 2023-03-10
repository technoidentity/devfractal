import { Action } from '@specs/action'
import { ErrorMessage } from '@ui/core'
import { getAuth } from '@core/getAuth'
import { useSafeQuery } from '@ui/core/useApi'
import { useAuth } from '@ui/core/useAuth'
import type { GetServerSideProps } from 'next'
import type { Session } from 'next-auth'
import Image from 'next/image'
import { any, z } from 'zod'

export const AllActionItemsForMobileView = () => {
  const [session] = useAuth()

  const { data, error } = useSafeQuery({
    key: ['users', session.user?.email, 'actions', 'pending'],
    spec: any(),
  })

  if (error) {
    return <ErrorMessage error={error} />
  }

  const actions = z.array(Action).parse(data)

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div>
        <div className="mt-12">
          <div className=" ">
            <div className="text-black w-full rounded-sm space-y-3 px-2 ">
              {/* logo */}
              <div className="text-white flex items-center space-x-2 pl-3 pt-5.5 -mb-2">
                <Image src="/Mask.svg" alt="Mask" width={20} height={20} />
                <span className="text-base font-bold text-blue-550 pl-1">
                  Action Items
                </span>
              </div>
              {/* all Pending action items */}
              {/*  Display Pending Action Items cards */}
              <div className="flex flex-col ">
                {/* Checking if the data is existed or not */}
                {actions ? (
                  // call the Card comp if the data exist
                  actions.map((item: Action) => {
                    return (
                      <div key={item.id} className="flex items-center mt-4">
                        <Card {...item} />
                      </div>
                    )
                  })
                ) : (
                  // Showing loading spinner if data is Loading
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async ctx => {
  const session = await getAuth({ ctx })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}

// @TODO: Remove duplicate card?
export const Card = (props: Action) => {
  const { description, dueDate } = props
  return (
    <div>
      <div className="pt-2 pl-3 flex">
        <div>
          <input type="checkbox" className="h-4 w-4 bg-gray-100" />
        </div>
        <div className="flex flex-col ml-5">
          <h2 className="text-sm -mt-1 mr-3">{description}</h2>
          <h3 className=" text-xs text-gray-450">
            Due on{' '}
            <span className="font-semibold">{dueDate.toISOString()}</span>
          </h3>
        </div>
      </div>
    </div>
  )
}
