import { refresh } from 'utils/auth'
import Cookies from 'universal-cookie'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Auth = () => {
  // access token 만료기한
  const JWT_EXPIRY_TIME = 1000 * 60 * 5 // 5 minutes
  const cookies = new Cookies()
  const refreshToken = cookies.get('refreshToken')
  const router = useRouter()
  const queryClient = useQueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity, // Prevent automatic refetching
      },
    },
  })
  const accessToken = queryClient.getQueryData('accessToken')

  const onRefreshSuccess = ({ accessToken, refreshToken }) => {
    // api요청할 때마다 accessToken을 헤더에 담아서 전송
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    // Set access token to queryClient
    queryClient.setQueryData('accessToken', accessToken)
  }

  const refreshMutation = useMutation(() => refresh(refreshToken), {
    onSuccess: (data) => {
      onRefreshSuccess(data)
    },
    onError: (error) => {
      // refresh token이 만료되었을 때
      cookies.remove('refreshToken')
    },
  })

  useEffect(() => {
    if (refreshToken) {
      console.log('there is refresh token')
      // silent refresh
      refreshMutation.mutate()

      const interval = setInterval(() => {
        refreshMutation.mutate()
      }, JWT_EXPIRY_TIME - 10000)

      return () => clearInterval(interval)
    } else {
      console.log('there is no refresh token')
    }
  }, [refreshToken])

  useEffect(() => {
    if (accessToken) {
      console.log('accessToken changed:', accessToken)
    }
  }, [])

  return <></>
}

export default Auth
