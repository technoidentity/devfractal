export const ErrorMessage = ({ error }: { error: Error }) => {
  return (
    <div className="font-mono text-3xl font-semibold text-red-500">
      {error.message}
    </div>
  )
}

export const FullPageLoading = () => {
  return (
    <div
      className={`fixed left-0 top-0 flex h-full w-full items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="border-b-16 mb-4 h-80 w-80 animate-spin rounded-full border-r-4 border-t-8 border-gray-400" />
        <h2 className="text-lg font-medium text-gray-700">Loading...</h2>
      </div>
    </div>
  )
}
