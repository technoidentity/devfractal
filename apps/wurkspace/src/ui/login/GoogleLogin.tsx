/* eslint-disable @typescript-eslint/no-misused-promises */

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export const GoogleLogin = () => {
  return (
    <div>
      <div className="-ml-px inline-flex items-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 36 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // className="stroke-blue-800 fill-blue-600"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.0027 17.3935L26.7811 13.1776C26.5357 11.9823 25.4776 11.0834 24.2095 11.0834C22.8462 11.0834 21.7256 12.1226 21.5967 13.452L13.7322 19.9396C13.2651 19.5113 12.6424 19.25 11.9587 19.25C11.1407 19.25 10.4102 19.624 9.92871 20.2104L0.122537 15.4167C1.1526 6.73375 8.54056 0 17.5014 0C27.1318 0 34.9454 7.77751 35.0027 17.3935ZM9.34796 22.1527L0 17.583C0.0446835 27.2098 7.86321 35 17.5014 35C26.5108 35 33.9302 28.1931 34.8965 19.4421L34.8378 19.5565L26.3626 15.2107C25.8881 15.8894 25.1007 16.3334 24.2095 16.3334C23.4445 16.3334 22.756 16.0062 22.2761 15.4841L14.5836 21.8299C14.5838 21.8449 14.5839 21.8599 14.5839 21.875C14.5839 23.3247 13.4086 24.5 11.9587 24.5C10.6026 24.5 9.48667 23.4719 9.34796 22.1527Z"
            fill="#605BFF
"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.0027 17.3935L26.7811 13.1776C26.5357 11.9823 25.4776 11.0834 24.2095 11.0834C22.8462 11.0834 21.7256 12.1226 21.5967 13.452L13.7322 19.9396C13.2651 19.5113 12.6424 19.25 11.9587 19.25C11.1407 19.25 10.4102 19.624 9.92871 20.2104L0.122537 15.4167C1.1526 6.73375 8.54056 0 17.5014 0C27.1318 0 34.9454 7.77751 35.0027 17.3935ZM9.34796 22.1527L0 17.583C0.0446835 27.2098 7.86321 35 17.5014 35C26.5108 35 33.9302 28.1931 34.8965 19.4421L34.8378 19.5565L26.3626 15.2107C25.8881 15.8894 25.1007 16.3334 24.2095 16.3334C23.4445 16.3334 22.756 16.0062 22.2761 15.4841L14.5836 21.8299C14.5838 21.8449 14.5839 21.8599 14.5839 21.875C14.5839 23.3247 13.4086 24.5 11.9587 24.5C10.6026 24.5 9.48667 23.4719 9.34796 22.1527Z"
            fill="#605BFF
"
          />
        </svg>
        <h1 className="pl-3 font-semibold text-3xl">Wurkspace</h1>
      </div>
      {/* Google Login */}
      {/* <div className="rounded-xl w-96 h-28 bg-white flex justify-center items-center shadow-xl"> */}
      <div className="mt-4">
        <button
          className="bg-white w-60 h-10 shadow-xl"
          onClick={() => signIn('google')}
        >
          <span className="text-white font-nunito text-sm inline-flex items-center py-2">
            <FcGoogle className="-ml-6 mr-2 w-6 h-6" />
            <span className=" text-gray-600 font-bold text-base">
              Continue with Google
            </span>
          </span>
        </button>
      </div>
      {/* </div> */}
      <div className="text-blue-700 font-bold font-nunito text-sm mt-4 ml-px">
        <Link href="/help"> Need Help?</Link>
      </div>
    </div>
  )
}
