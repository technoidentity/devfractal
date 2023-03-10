import type { UserProfile } from '@specs/old/profile'

type PersonalInformationTableProps = UserProfile

export const PersonalInformationTable = ({
  name,
  email,
  phone,
  bio,
  manager,
}: PersonalInformationTableProps) => (
  <div className="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
    <h2 className="text-lg font-bold leading-tight text-black">
      Personal Information
    </h2>

    <div className=" flex flex-col mt-6 divide-y divide-gray-200">
      <div className="inline-flex py-[15px]">
        <h2 className="text-[#828796] text-sm pr-[158px] font-extralight">
          Display Name
        </h2>
        <h2 className="text-[#262626] text-sm font-semibold">{name}</h2>
      </div>
      <div className="inline-flex py-[15px]">
        <h2 className="text-[#828796] text-sm pr-[211px] font-extralight">
          Email
        </h2>
        <h2 className="text-[#262626] text-sm font-semibold">{email}</h2>
      </div>
      <div className="inline-flex py-[15px]">
        <h2 className="text-[#828796] text-sm pr-[206px] font-extralight">
          Phone
        </h2>
        <h2 className="text-[#262626] text-sm font-semibold">{phone}</h2>
      </div>
      <div className="inline-flex py-[15px]">
        <h2 className="text-[#828796] text-sm pr-[225.3px] font-extralight">
          Bio
        </h2>
        <h2 className="text-[#262626] text-sm font-semibold">{bio}</h2>
      </div>
      <div className="inline-flex py-[15px]">
        <h2 className="text-[#828796] text-sm pr-[124px] font-extralight">
          Reporting Manager
        </h2>
        <h2 className="text-[#262626] text-sm font-semibold">{manager}</h2>
      </div>
    </div>
  </div>
)
