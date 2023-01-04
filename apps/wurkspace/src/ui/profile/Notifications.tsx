export const Notification = () => (
  <div className="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
    <div className="inline-flex">
      <div className="flex flex-col pr-[135px]">
        <h2 className="pb-[14px] text-lg text-black font-bold">
          Notifications
        </h2>
        <h2 className="text-black text-base">Action Items</h2>
      </div>
      <div className="pt-[7px] flex space-x-[35px]">
        <div className="flex flex-col items-center">
          <h2 className="pb-[21px] text-[13px] text-[#828796]">Email</h2>
          <input type="checkbox" id="email" name="email" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="pb-[21px] text-[13px] text-[#828796]">Browser</h2>
          <input type="checkbox" id="browser" name="browser" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="pb-[21px] text-[13px] text-[#828796]">Push</h2>
          <input type="checkbox" id="push" name="push" />
        </div>
      </div>
    </div>
  </div>
)
