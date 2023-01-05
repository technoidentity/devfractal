import { useSafeQuery } from '@ui/core/useApi'

import { jstr } from '@srtp/core'
import { Goals } from '@ui/profile/Goals'
import { IntelligentLables, TextBox } from '@ui/profile/Util'
import React from 'react'
import { any } from 'zod'

export const GoalsPopup = () => {
  const { data: goals, error: goalsError }: any = useSafeQuery({
    key: ['goals-popup'],
    spec: any(),
  })

  const { data: intelligentContext, error: intelligentContextError }: any =
    useSafeQuery({ key: ['intelligent-context'], spec: any() })

  if (goalsError) {
    return <pre style={{ color: 'red' }}>{jstr(goalsError)}</pre>
  }

  if (intelligentContextError) {
    return <pre style={{ color: 'red' }}>{jstr(intelligentContextError)}</pre>
  }

  if (!goals || !intelligentContext) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return (
    <div className="w-max ml-auto font-nunito">
      <div className="max-w-full my-2">
        <div className="bg-white w-full shadow py-6 px-4">
          <IntelligentLables value={'OKRs'} />
          {goals.GoalsData?.map(
            (
              goal: { result: number; objective: string },
              index: React.Key | null | undefined,
            ) => (
              <>
                <Goals
                  results={goal.result}
                  objectives={goal.objective}
                  key={index}
                />
              </>
            ),
          )}
          {intelligentContext.IntelligentContextList?.map(
            (
              item: { type: string; content: any[] },
              index: React.Key | null | undefined,
            ) => (
              <>
                <IntelligentLables value={item.type} key={index} />
                {item.content.map((context, id) => (
                  <>
                    <TextBox value={context} key={id} />
                  </>
                ))}
              </>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
