import { createRoot } from 'react-dom/client'

import './index.css'

const root = createRoot(document.getElementById('root')!)

// const qc = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       suspense: true,
//       useErrorBoundary: true,
//     },
//     mutations: {
//       useErrorBoundary: true,
//     },
//   },
// })

// root.render(
//   <ErrorBoundary fallback={<div>Something went wrong</div>}>
//     <Suspense fallback={<div>Loading...</div>}>
//       <QueryClientProvider client={qc}>
//         <TodoQueryApp />
//       </QueryClientProvider>
//     </Suspense>
//   </ErrorBoundary>,
// )

root.render(<h1>Hello World!</h1>)
