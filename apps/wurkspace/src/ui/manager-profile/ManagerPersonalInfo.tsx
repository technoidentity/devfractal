import { ErrorMessage } from '../core'
import { useManagerProfile } from '../queries'

export const ManagerPersonalInfo = () => {
  const { manager, error } = useManagerProfile()

  if (error) {
    return (
      <div className="ml-14">
        <ErrorMessage error="can't fetch manager profile" />
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        <div className="w-full font-nunito ">
          <div className="bg-white mb-3 ml-14 mx-1 py-4 pl-4 shadow-lg h-16 ">
            <h1 className="md:text-2xl text-2xl font-bold text-blue-800">
              Your Manager
            </h1>
          </div>
          <div className="max-w-full ml-14 px-[15px]">
            <div className="bg-white w-full h-[710px] shadow-lg rounded-[10px] pt-[32px] pl-[39px] ">
              <div className="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
                <h2 className="text-lg font-bold leading-tight text-black">
                  Personal Information
                </h2>

                <div className=" flex flex-col mt-6 divide-y divide-gray-200">
                  <div className="inline-flex py-[15px]">
                    <h2 className="text-[#828796] text-sm pr-[158px] font-extralight">
                      Display Name
                    </h2>
                    <h2 className="text-[#262626] text-sm font-semibold">
                      {manager?.firstName} {manager?.lastName}
                    </h2>
                  </div>
                  <div className="inline-flex py-[15px]">
                    <h2 className="text-[#828796] text-sm pr-[211px] font-extralight">
                      Email
                    </h2>
                    <h2 className="text-[#262626] text-sm font-semibold">
                      {manager?.email}
                    </h2>
                  </div>
                  <div className="inline-flex py-[15px]">
                    <h2 className="text-[#828796] text-sm pr-[206px] font-extralight">
                      Phone
                    </h2>
                    <h2 className="text-[#262626] text-sm font-semibold">
                      {manager?.mobile}
                    </h2>
                  </div>
                  <div className="inline-flex py-[15px]">
                    <h2 className="text-[#828796] text-sm pr-[225.3px] font-extralight">
                      Bio
                    </h2>
                    <h2 className="text-[#262626] text-sm font-normal">
                      {manager?.aboutMe}
                    </h2>
                  </div>
                  {/* this is for horizontal line */}
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
