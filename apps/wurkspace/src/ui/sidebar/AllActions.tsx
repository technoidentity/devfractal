import { Action } from '@specs/action'
import { usePendingActions } from '@ui/queries'
import { format } from 'date-fns'
import Image from 'next/image'

const Loading = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
)

type CardProps = Readonly<{ action: Action }>

const Card = ({ action }: CardProps) => {
  const { description, dueDate } = action

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
            <span className="font-semibold">
              {format(dueDate, 'dd-MM-yyyy')}
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}

const Logo = () => (
  <div className="text-white flex items-center space-x-2 pl-3 pt-5.5 -mb-2">
    <Image src="/Mask.svg" alt="Mask" width={20} height={20} />
    <span className="text-base font-bold text-blue-550 pl-1">Action Items</span>
  </div>
)

type AllActionsViewProps = Readonly<{ actions?: readonly Action[] }>

const AllActionsView = ({ actions }: AllActionsViewProps) => {
  if (!actions) {
    return <Loading />
  }

  return (
    <>
      {actions.map(action => (
        <div key={action.id} className="flex items-center mt-4">
          <Card action={action} />
        </div>
      ))}
    </>
  )
}

export const AllActions = () => {
  const { actions } = usePendingActions()

  return actions ? (
    <div className="font-nunito">
      <div className="relative min-h-screen flex">
        <div className="bg-white text-black w-66 rounded-sm space-y-3 px-2 transform  md:relative md:translate-x-0 transition duration-300 ease-in-out">
          <Logo />
          <AllActionsView actions={actions} />
          <div className="flex flex-col "></div>
        </div>
      </div>
    </div>
  ) : null
}
