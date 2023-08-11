import { useEffect } from 'react'
import { axiosInstanceV2 } from '@/lib/axios'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

async function test() {
  const response = await axiosInstanceV2.get('/alert')
  console.log(response)
}

export default function MyPage() {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const { data: accessToken } = useQuery('accessToken', () => {})
  const refreshToken = cookies['refreshToken']
  const router = useRouter()

  useEffect(() => {
    // 로그인 되어있지 않은 경우
    if (!refreshToken) {
      router.replace('/login')
    }
  }, [refreshToken])

  useEffect(() => {
    // accessToken이 set되면 실행
    if (accessToken) {
      test()
    }
  }, [accessToken])
  return <>Hello</>
}
