import { Label, Content } from '@specs/old/profile'

export const Labels = (param: Label) => (
  <h2 className="text-lg font-bold leading-tight text-black">{param.value} </h2>
)

export const IntelligentLables = (param: Label) => (
  <h2 className="text-lg font-bold leading-tight py-2 text-blue-600">
    {param.value}{' '}
  </h2>
)

export const TableContent = ({ id, value }: Content) => (
  <tr className=" border-b border-gray-200 py-10 font-nunito ">
    <td className="px-6 py-4 text-gray-400 ">{id}</td>
    <td className="px-6 py-4 font-bold">{value}</td>
  </tr>
)

export const Headers = ({ value }: Label) => (
  <h1 className="md:text-2xl text-xl font-bold text-blue-600">{value}</h1>
)

export const TextBox = (param: Label) => (
  <div className=" md:w-60 md:h-auto bg-gray-100 w-full rounded-md m-2 py-3.5 pl-3.5 pr-1 overflow-hidden">
    <h1 className="text-sm font-normal w-full ">{param.value}</h1>
  </div>
)
