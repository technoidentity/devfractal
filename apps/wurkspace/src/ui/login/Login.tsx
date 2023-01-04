import { notify } from '@ui/core/notify'
import { GoogleLogin } from '@ui/login/GoogleLogin'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Login = () => {
  const { error } = useRouter().query

  if (error === 'AccessDenied') {
    notify('Use Technoidentity email domain', 'info')
  }

  return (
    <div className="font-nunito bg-gray-100 h-screen flex flex-row">
      {/* Background image */}
      <div className="absolute lg:left-28 sm:left-10 bottom-0 z-10">
        <div>
          <div className="lg:ml-[330px] lg:-mt-[100px] lg:w-[271px] sm:absolute sm:-mt-[110px] sm:ml-[310px] sm:w-[271px] absolute ml-[200px] w-36 lg:opacity-100 sm:opacity-20 opacity-20">
            <Image src="/speech.svg" alt="login" width={210} height={130} />
          </div>
          <h1 className="lg:absolute sm:absolute sm:-mt-[95px] sm:ml-[325px] lg:-mt-[85px] lg:ml-[350px] ml-[210px] lg:pt-0 sm:pt-0 pt-[8px] w-32 lg:w-40 sm:w-40 lg:leading-[26px] sm:leading-[26px] leading-[20px] lg:text-base sm:text-base text-xs font-bold lg:opacity-100 sm:opacity-20 opacity-20">
            Make your secured one-on-one meetings actionable.
          </h1>
        </div>
        {/* desk pic */}
        <div className="lg:opacity-80 sm:opacity-20 opacity-20">
          <Image src="/login.svg" alt="login" width={540} height={480} />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center z-10">
        {/* absolute right-[500px] top-[300px] z-20*/}
        <div className="lg:absolute lg:right-[300px] -mt-20">
          <GoogleLogin />
        </div>
        {/* this toast comp will appear when the user trying to login with his personal email domain */}
        {error === 'AccessDenied' && (
          <ToastContainer draggable={false} transition={Zoom} limit={1} />
        )}
      </div>
    </div>
  )
}
