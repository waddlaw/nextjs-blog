import '../styles/global.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import * as gtag from '../lib/gtag'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (!gtag.existsGaId) {
      return
    }
    
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}