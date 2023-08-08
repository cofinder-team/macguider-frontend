import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/layouts/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Analytics from '@/components/analytics'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { isDevelopment } from 'utils/env'
import { useRouter } from 'next/router'

config.autoAddCss = false

const isSocket = process.env.SOCKET
const queryClient = new QueryClient()
const pathsToPreventWrap = ['/curation', '/login', '/signup']

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isPreventWrap = pathsToPreventWrap.includes(router.pathname)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} forcedTheme="light">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        {isPreventWrap ? (
          <Component {...pageProps} />
        ) : (
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        )}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
