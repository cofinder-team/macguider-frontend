import { useEffect } from 'react'
import { init } from '@amplitude/analytics-browser'

const Amplitude = () => {
  useEffect(() => {
    const isProduction = () => process.env.NODE_ENV === 'production'
    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      if (isProduction()) {
        init(process.env.NEXT_PUBLIC_AMPLITUDE_ID, null, {
          defaultTracking: { pageViews: false },
          includeFbclid: true,
          includeGclid: true,
          includeUtm: true,
          includeReferrer: true,
          saveEvents: true,
        })
      } else {
        console.log('Amplitude initialized')
      }
    }
  }, [])

  return null
}

export default Amplitude
