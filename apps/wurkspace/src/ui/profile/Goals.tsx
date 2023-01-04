import { OKR } from '@specs/old/profile'

export type GoalsProps = OKR

export const Goals = (props: GoalsProps) => (
  <div className=" md:w-60 md:h-auto bg-gray-100 w-full rounded-md mt-2 py-3.5 pl-4 overflow-hidden">
    <h1 className="text-sm font-normal w-44 overflow-hidden">
      {props.objectives}
    </h1>
    <div className="  relative h-1 py-1 flex">
      <div className=" h-1.5 flex rounded bg-white w-44">
        <div
          style={{ width: props.results }}
          className={
            props.results > 75
              ? 'bg-green-450 rounded-md'
              : props.results > 35
              ? 'bg-yellow-500 rounded-md'
              : 'bg-red-600 rounded-md'
          }
        ></div>
      </div>
      <span
        className="text-xs font-bold  mx-auto py-auto
       text-black"
      >
        {props.results}
        {'%'}
      </span>
    </div>
  </div>
)
