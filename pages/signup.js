import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { register } from 'utils/auth'
import { useState, useEffect } from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'

export default function SignUp() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [isEmailSent, setIsEmailSent] = useState(false) // 인증 이메일 발송 여부
  const [errorMessage, setErrorMessage] = useState('') // 에러 메세지
  const { email, password } = values

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // 이메일 유무 확인
      const data = await register(email, password)

      if (data.email) {
        setIsEmailSent(true)
      }
    } catch (error) {
      const { message } = error.response?.data

      setErrorMessage(message)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <AuthLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {isEmailSent ? (
          <div className="sm:mx-auto sm:w-full sm:max-w-[300px]">
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

            <h2 className="mt-2 text-center text-base font-semibold leading-9 tracking-tight text-gray-900">
              이메일 확인
            </h2>

            <div className="mt-9">
              인증 메일을
              <br />
              <span className="font-semibold">{email}</span>
              으로 보냈어요. <br />
              혹시 이메일이 오지 않았나요?
              <br />
              스팸함을 확인하거나 다시 받아보세요
              <br />
            </div>
          </div>
        ) : (
          <>
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
                회원가입
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border-[1px] border-black bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                  >
                    회원가입
                  </button>
                </div>
              </form>

              {errorMessage && (
                <div className="mt-4 text-center text-sm text-red-500">{errorMessage}</div>
              )}

              <p className="mt-10 text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="font-semibold leading-6 text-black hover:underline">
                  로그인
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
