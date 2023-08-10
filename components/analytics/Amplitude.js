import { useEffect } from 'react'
import { init } from '@amplitude/analytics-browser'
import { useQuery } from 'react-query'
import { useCookies } from 'react-cookie'
import { Base64 } from 'js-base64'

const Amplitude = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const refreshToken = cookies['refreshToken']
  const { data: accessToken } = useQuery('accessToken', () => {})

  useEffect(() => {
    const isProduction = () => process.env.NODE_ENV === 'production'
    const isBrowser = () => typeof window !== 'undefined'
    let userEmail = null

    if (isBrowser()) {
      if (refreshToken && accessToken) {
        const decoded = Base64.decode(refreshToken)
        const emailRegex = /"email":"([^"]+)"/
        userEmail = decoded.match(emailRegex)[1]
      }

      if (isProduction()) {
        init(process.env.NEXT_PUBLIC_AMPLITUDE_ID, userEmail, {
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
  }, [refreshToken, accessToken])

  return null
}

export default Amplitude
