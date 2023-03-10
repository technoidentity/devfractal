import type { Action } from '@specs/action'
import { ErrorMessage } from '@ui/core'
import { LoadingScreen } from '@ui/LoadingScreen'
import { usePendingActions } from '@ui/queries'
import { format } from 'date-fns'

export const PendingActions = () => {
  const { actions, error } = usePendingActions()

  if (error) {
    console.error(error)
    return <ErrorMessage error="can't fetch actions from server" />
  }

  return (
    <>
      <div className="max-w-md h-50 shadow-2xl rounded-2lg bg-white lg:px-5 lg:pt-2 sm:px-4 sm:pt-3 px-5 pt-3">
        <div className="lg:text-2xl sm:text-xl text-xl font-semibold leading-5 text-gray-800 lg:pb-2 sm:pb-2 pb-3">
          Action Items
        </div>

        {/*  Display Pending Action Items cards */}
        <div className="scrollbar h-32 overflow-hidden overflow-y-scroll ">
          <div className="flex flex-col">
            {/* Checking if the data is existed or not */}
            {actions ? (
              actions.length ? (
                // call the Card comp if the actions exist
                actions.map(item => {
                  return (
                    <div key={item.id} className="flex items-center py-1">
                      <Card action={item} />
                    </div>
                  )
                })
              ) : (
                // No Pending Actions
                <div className="-ml-3">
                  <div className="flex justify-center items-center h-[120px] w-[415px] text-2xl font-normal">
                    No pending action items
                  </div>
                </div>
              )
            ) : (
              // Showing loading indication when data is Loading...
              <div className="h-32 flex justify-center items-center">
                <LoadingScreen />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

type CardProps = Readonly<{ action: Action }>
const Card = ({ action }: CardProps) => {
  const { description, dueDate } = action

  return (
    <div>
      <div className=" inline-flex">
        <div>
          <input type="checkbox" className="h-4 w-4 bg-gray-100" />
        </div>
        <div className="flex flex-col mx-4">
          <h2 className="text-sm -mt-px mr-3">{description}</h2>
          <h3 className=" text-xs text-gray-450">
            Due on{' '}
            <span className="font-semibold">
              {format(dueDate, 'dd-MM-yyyy')}
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}
