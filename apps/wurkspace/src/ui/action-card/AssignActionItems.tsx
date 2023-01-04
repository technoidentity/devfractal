import Image from 'next/image'

export const AssignActionItems = () => {
  return (
    <div>
      <div className="shadow-2xl w-[202px] h-[110px] rounded-[5px] bg-white flex flex-col absolute -mt-[50px] ml-16 z-10">
        <div className="inline-flex pl-[17px] pt-[14px]">
          <Image
            src="/manager-pic.svg"
            alt="userIcon"
            width={34}
            height={34}
            className="rounded-full cursor-pointer"
          />
          <div className="pt-2 text-sm font-semibold pl-4">Emma</div>
        </div>
        <div className="inline-flex pl-[17px] pt-[16px]">
          <Image
            src="/user.svg"
            alt="userIcon"
            width={34}
            height={34}
            className="rounded-full cursor-pointer"
          />
          <div className="pt-2 text-sm font-semibold pl-4">John Doe</div>
        </div>
      </div>
    </div>
  )
}
