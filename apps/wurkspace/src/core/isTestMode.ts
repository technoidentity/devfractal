export const isTestMode = () => {
  return process.env.NEXT_PUBLIC_TEST_MODE === 'true'
}
