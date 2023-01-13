import Link from 'next/link'
import Image from 'next/image'

const PageNotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="lg:w-[374.66px] lg:h-[275px] sm:w-[374.66px] sm:h-[275px] w-[230px] h-[180px] -mt-40">
        <Image src="/detective.svg" alt="login" width={375} height={275} />
      </div>
      <div className="flex flex-col items-center justify-center lg:mt-[21px] sm:mt-4">
        <h1 className="text-[38px] leading-[52px] font-semibold ">Oops...!</h1>
        <h1 className="lg:text-lg sm:text-lg text-sm font-medium ">
          We can’t find the page what you are looking for
        </h1>
        <button className="w-[143px] h-[35px] bg-[#605BFF] rounded-md text-white text-[16px] mt-[21px]">
          <Link href="/">Back to Home</Link>
        </button>
      </div>
    </div>
  )
}

PageNotFoundPage.isPublic = true

export default PageNotFoundPage
