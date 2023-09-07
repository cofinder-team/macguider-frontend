import { useCookies } from 'react-cookie'
import { useQuery } from 'react-query'

function useAuthorization() {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const refreshToken = cookies['refreshToken']
  const { data: accessToken } = useQuery('accessToken', () => {})
  const isUserLoggedIn = !!(refreshToken && accessToken)

  return { isUserLoggedIn, accessToken, refreshToken, setCookie, removeCookie }
}

export default useAuthorization
