import { refresh } from 'utils/auth'
import { useCookies } from 'react-cookie'
import { useMutation, useQueryClient } from 'react-query'
import { useCallback, useEffect } from 'react'
import { axiosInstanceV2 } from '@/lib/axios'

const Auth = () => {
  // access token 만료기한
  const JWT_EXPIRY_TIME = 1000 * 60 * 3 // 3 minutes
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const refreshToken = cookies['refreshToken']
  const queryClient = useQueryClient()

  const onRefreshSuccess = useCallback(({ accessToken, refreshToken }) => {
    // api요청할 때마다 accessToken을 헤더에 담아서 전송
    axiosInstanceV2.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    // Set access token to queryClient
    queryClient.setQueryData('accessToken', accessToken)
  }, [])

  const refreshMutation = useMutation(() => refresh(refreshToken), {
    onSuccess: (data) => {
      onRefreshSuccess(data)
    },
    onError: (error) => {
      // refresh token이 만료되었을 때
      removeCookie('refreshToken')
    },
  })

  useEffect(() => {
    if (refreshToken) {
      console.log('there is refresh token')
      // silent refresh
      refreshMutation.mutate()

      const interval = setInterval(() => {
        refreshMutation.mutate()
      }, JWT_EXPIRY_TIME)

      return () => clearInterval(interval)
    } else {
      console.log('there is no refresh token')
    }
  }, [refreshToken])

  return <></>
}

export default Auth
