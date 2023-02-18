import type { Goal } from '@specs/old/goals'
import { ErrorMessage } from '@ui/core'
import { useSafeQuery } from '@ui/core/useApi'
import { LoadingScreen } from '@ui/LoadingScreen'
import { z } from 'zod'

export const Goals = () => {
  const { data, error } = useSafeQuery({ key: ['goals'], spec: z.any() })

  if (error) {
    return <ErrorMessage error="Currently fetching goals not supported" />
  }

  const goals = data
  return (
    <div className="font-nunito">
      <div className="flex flex-col bg-white rounded-lg h-80 shadow-lg lg:w-99 max-w-md px-4">
        <h1 className="lg:text-2xl sm:text-xl text-xl font-bold pt-3">
          Your Goals
        </h1>

        {/*  Display Goals cards */}
        <div className="scrollbar h-65 overflow-hidden overflow-y-scroll">
          <div className="flex flex-col justify-center pr-2">
            {/* Checking if the data is existed or not */}
            {goals ? (
              // Checking if the user have goals or not
              goals.length ? (
                // call the Card comp if the goals exist
                goals.map((item: any) => {
                  return (
                    <div key={item.id} className="py-1">
                      <Card {...item} />
                    </div>
                  )
                })
              ) : (
                // If Goals are empty
                <div className="-ml-3">
                  <div className="flex justify-center items-center h-[220px] w-[415px] text-2xl font-extralight">
                    No goals
                  </div>
                </div>
              )
            ) : (
              // Showing loading indication when data is Loading...
              <div className="h-[220px] w-[390px] flex justify-center items-center">
                <LoadingScreen />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Card = (props: Goal) => {
  const { text, progress } = props

  return (
    <div className="bg-gray-100 w-full rounded-md mt-2.7 pt-3.2 lg:px-5.5 ">
      <h1 className="text-sm font-normal lg:w-64 sm:px-4 px-5">{text}</h1>
      <div className="relative pt-1 lg:w-82 sm:px-4 px-5">
        {/* Progress bar */}
        <div className="overflow-hidden h-1.7 flex rounded bg-white">
          <div
            style={{ width: `${progress}%` }}
            className={`rounded-md ${
              progress >= 70
                ? 'bg-green-450'
                : progress >= 35
                ? 'bg-yellow-400'
                : 'bg-red-500'
            }`}
          ></div>
        </div>
        {/* Show percentage below of the progressbar */}
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-black">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  )
}
