import { useAuth } from '@ui/core/useAuth'
import Image from 'next/image'

export const GreetingHeader = () => {
  // Greet your Visitors with Good Morning, Good Afternoon or Good Evening Message
  const hour: number = new Date().getHours()
  const [session] = useAuth()

  return (
    <div>
      {/* Greeting message to the user */}
      <div className=" flex flex-row space-x-3 font-nunito ">
        <div className="lg:w-28 sm:w-50 w-50">
          <Image src="/greet.svg" alt="userIcon" width={94} height={114} />
        </div>
        <div>
          <h1 className="font-bold mt-1 text-blue-700 not-italic text-lg md:text-xl lg:text-2xl">
            {`Good
              ${
                (hour < 12 && 'Morning ') ||
                (hour < 18 && 'Afternoon ') ||
                'Evening '
              }`}
            {session && session.user && session.user.name}
          </h1>
          <p className=" tracking-wide lg:w-6/12 sm:w-11/12 w-full lg:text-base sm:text-base text-sm ">
            <span className="font-bold  ">Set the foundation for Success.</span>{' '}
            Wurkspace is for you to get connected with your colleagues and have
            productive and meaningful One-on-one meetings. You can build
            collaborative meeting agendas, come up with action items and keep
            each other accountable and motivated.
          </p>
        </div>
      </div>
    </div>
  )
}
