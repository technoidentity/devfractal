import type { Faq } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Faq as FaqView } from './Faq'

export type HelpProps = Readonly<{ faqs: Faq[] }>

export const Help = ({ faqs }: HelpProps) => (
  <div className="font-nunito">
    <div className="bg-gray-200 flex flex-col h-screen relative">
      <div>
        <h1 className="bg-white h-15 font-bold text-blue-700 text-2xl p-3">
          Need Help?
        </h1>
      </div>
      <div className="flex-1 max-w-full relative m-3 bg-white w-ful max-h-full shadow-lg rounded-lg ">
        <div className="lg:p-4 sm:p-4 absolute z-10">
          {faqs.map(faq => (
            <FaqView question={faq.question} key={faq.id} answer={faq.answer} />
          ))}
        </div>
        {/* image page layout */}
        <div>
          <div className="absolute bottom-0 right-0 opacity-10 sm:opacity-20 lg:opacity-100">
            <div className="-mb-36 ml-24">
              <Image
                src="/questionmark.svg"
                alt="question"
                width={280}
                height={180}
              />
            </div>
            <div className="mr-6.5">
              <Image src="/help.svg" alt="help" width={450} height={442} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
