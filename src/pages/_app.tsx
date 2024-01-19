// Nextjs
import type { AppProps } from 'next/app'

// React Query
import { QueryClient, QueryClientProvider } from 'react-query'

// Styles
import '@theme/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
