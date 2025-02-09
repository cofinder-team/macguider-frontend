import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { register, resendEmail } from 'utils/auth'
import { useState, useEffect, useCallback } from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { classNames } from 'utils/basic'
import { useCookies } from 'react-cookie'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import amplitudeTrack from '@/lib/amplitude/track'

const passwordRules = ['최소 8자', '특수문자를 포함하세요', '숫자를 포함하세요']

export default function SignUp() {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const refreshToken = cookies['refreshToken']
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()
  const { email, password } = values

  const [showPassword, setShowPassword] = useState(false)

  const [currentStep, setCurrentStep] = useState(0)
  const [errorMessages, setErrorMessages] = useState({
    client: null,
    server: null,
  })
  const { data: accessToken } = useQuery('accessToken', () => {})
  const [passwordStatus, setPasswordStatus] = useState(passwordRules.map(() => false))

  const isUserLoggedIn = !!(refreshToken && accessToken)

  useEffect(() => {
    amplitudeTrack('enter_page_signup')
  }, [])

  useEffect(() => {
    // 이미 로그인 되어있는 경우
    if (isUserLoggedIn) {
      router.replace('/')
    }
  }, [isUserLoggedIn])

  const isSignUpReady = useCallback(() => {
    return passwordStatus.every((status) => status) && !errorMessages.client
  }, [passwordStatus, errorMessages])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isSignUpReady()) return
    amplitudeTrack('click_signup')
    try {
      // 이메일 유무 확인
      const data = await register(email, password)

      if (data.email) {
        setCurrentStep(1)
      }
    } catch (error) {
      const { message } = error.response?.data

      setErrorMessages((prev) => ({
        ...prev,
        server: message,
      }))
    }
  }

  const handleChange = useCallback((e) => {
    e.preventDefault()
    const { name, value } = e.target

    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/
      const isValidEmail = emailRegex.test(value)

      if (!isValidEmail) {
        setErrorMessages((prev) => ({ ...prev, client: '이메일 형식이 올바르지 않습니다.' }))
      } else {
        setErrorMessages((prev) => ({ ...prev, client: null }))
      }
    }

    if (name === 'password') {
      const status = passwordRules.map((rule) => {
        if (rule === '최소 8자') {
          return value.length >= 8
        } else if (rule === '특수문자를 포함하세요') {
          return /[~!@#$%^&*()_+|<>?:{}]/.test(value)
        } else if (rule === '숫자를 포함하세요') {
          return /[0-9]/.test(value)
        }
      })

      setPasswordStatus(status)
    }

    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const toggleShowPassword = useCallback(() => {
    amplitudeTrack('toggle_show_password')
    setShowPassword((prev) => !prev)
  }, [])

  const onClickResendEmail = useCallback(async () => {
    amplitudeTrack('click_resend_email')
    await resendEmail(email)
  }, [email])

  const onClickMovePrevStep = useCallback(() => {
    setCurrentStep(0)
    // initialize values
    amplitudeTrack('click_signup_move_prev_step')
    setValues({
      email: '',
      password: '',
    })
  }, [])

  return (
    <AuthLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {currentStep === 1 ? (
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
              <div>
                인증 메일을
                <br />
                <span className="font-semibold">{email}</span>
                으로 보냈어요. <br />
                혹시 이메일이 오지 않았나요?
                <br />
                스팸함을 확인하거나 다시 받아보세요
                <br />
              </div>

              <div
                onClick={onClickResendEmail}
                className="mx-auto mt-8 w-fit cursor-pointer rounded-md border-[1px] border-gray-300 py-2 px-3 text-center font-bold text-gray-500"
              >
                <FontAwesomeIcon icon={faRotateRight} className="mr-3" />
                이메일 다시 보내기
              </div>
              <div
                className="mt-3 cursor-pointer text-center font-bold text-gray-500"
                onClick={onClickMovePrevStep}
              >
                뒤로가기
              </div>
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
                  {errorMessages.client && (
                    <div className="mt-2 text-sm text-red-500">{errorMessages.client}</div>
                  )}
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
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />

                    <div
                      className="absolute top-0 right-2 flex h-full cursor-pointer items-center justify-center p-1 text-gray-500"
                      onClick={toggleShowPassword}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </div>
                  </div>
                  <ul className="mt-3 max-w-md list-inside space-y-1 text-sm text-gray-500 dark:text-gray-400">
                    {passwordStatus.map((status, index) => (
                      <li className="flex items-center" key={index}>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className={classNames(
                            'mr-2 ',
                            status ? 'text-green-500 dark:text-green-400' : 'text-gray-300'
                          )}
                        />
                        {passwordRules[index]}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    type="submit"
                    className={classNames(
                      ' flex w-full justify-center rounded-md border-[1px] border-black bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                      !isSignUpReady() && 'cursor-not-allowed opacity-10'
                    )}
                    onClick={handleSubmit}
                  >
                    회원가입
                  </button>
                </div>
              </form>

              {errorMessages.server && (
                <div className="mt-4  text-sm text-red-500">{errorMessages.server}</div>
              )}

              <p className="mt-10 text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="font-semibold leading-6 text-black underline">
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
