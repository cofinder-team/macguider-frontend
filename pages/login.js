import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { login } from 'utils/auth'
import { useCallback, useEffect, useState } from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { useCookies } from 'react-cookie'

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const refreshToken = cookies['refreshToken']
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const { email, password } = values
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const queryClient = useQueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity, // Prevent automatic refetching
      },
    },
  })

  useEffect(() => {
    // 이미 로그인 되어있는 경우
    if (refreshToken) {
      router.push('/')
    }
  }, [])

  const onLoginSuccess = useCallback(({ accessToken, refreshToken }) => {
    // Set access token to queryClient
    queryClient.setQueryData('accessToken', accessToken)

    setCookie('refreshToken', refreshToken, {
      path: '/',
      maxAge: 3600 * 24 * 7, // 7 days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    // Redirect to home page
    router.push('/')
  }, [])

  const onLoginError = useCallback((error) => {
    setErrorMessage(error.response.data.message)
  }, [])

  const loginMutation = useMutation(() => login(email, password), {
    onSuccess: onLoginSuccess,
    onError: onLoginError,
  })

  // 일반로그인 시 email, password 입력
  // true: 토큰 발급, false: 로그인 실패 알림(email,password) => 잘못된 이메일, 잘못된 비밀번호 확인
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      loginMutation.mutate()
    } catch (e) {
      console.log(e.response)
    }
  }, [])

  const handleChange = useCallback((e) => {
    e.preventDefault()
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <AuthLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/" aria-label={siteMetadata.headerTitle} className="mx-auto h-10 w-auto">
            <div className="flex items-center justify-center">
              <div
                className="mr-3"
                style={{
                  transform: 'scaleX(-1)',
                }}
              >
                <Logo />
              </div>

              <div className="h-6 text-2xl font-semibold leading-6 sm:block">
                {siteMetadata.headerTitle}
              </div>
            </div>
          </Link>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border-[1px] border-black bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                로그인
              </button>
            </div>
          </form>
          {errorMessage && <div className="mt-4  text-sm text-red-500">{errorMessage}</div>}

          <p className="mt-10 text-center text-sm text-gray-500">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="font-semibold leading-6 text-black underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
