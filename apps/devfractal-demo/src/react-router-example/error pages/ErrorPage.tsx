export function ErrorPage(): JSX.Element {
  return (
    <main className="flex h-[100vh] flex-col justify-center gap-y-8  text-center text-black">
      <p style={{ fontStyle: 'italic' }} className="text-xl">
        Oops!
      </p>
      <p className="text-xl font-semibold">
        Failed to load the requested data!
      </p>
    </main>
  )
}
