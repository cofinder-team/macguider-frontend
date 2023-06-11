import { useEffect } from 'react'
import amplitude from 'amplitude-js'

const Amplitude = () => {
  useEffect(() => {
    // Amplitude 초기화
    amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_ID, null, {
      includeFbclid: true,
      includeGclid: true,
      includeUtm: true,
      includeReferrer: true,
      saveEvents: true,
    })
  }, [])

  return null
}

export default Amplitude
