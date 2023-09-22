import { forwardRef, useRef, useState } from 'react'

import amplitudeTrack from '@/lib/amplitude/track'
import { sendSubscribeByEmail } from 'utils/user'
import { AxiosError } from 'axios'

const NewsletterForm = ({ title = 'MacGuider 최신 업데이트 소식 받기' }, ref) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    amplitudeTrack('click_subscribe_newsletter')

    if (!inputEl?.current?.value) {
      setError(true)
      setMessage('이메일을 입력해주세요.')
      return
    }

    sendSubscribeByEmail(inputEl.current.value)
      .then(() => {
        if (inputEl.current) {
          inputEl.current.value = ''
        }

        setError(false)
        setSubscribed(true)
        setMessage('감사합니다! 🎉  구독이 완료되었습니다.')
      })
      .catch((e: AxiosError) => {
        if (e?.response?.status === 400) {
          setError(true)
          setMessage('잘못 입력된 이메일 주소입니다. 다시 확인해주세요.')
        } else {
          setError(true)
          setMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        }
      })
  }

  return (
    <div ref={ref}>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="email-input">
            이메일 주소
          </label>
          <input
            autoComplete="email"
            className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="email-input"
            name="email"
            placeholder={subscribed ? '구독 감사합니다!  🎉' : '이메일을 입력해주세요'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <button
            className={`w-full rounded-md bg-blue-800 px-4 py-2 font-medium text-white sm:py-0 ${
              subscribed
                ? 'cursor-default'
                : 'border hover:border-blue-700 hover:bg-white hover:text-blue-800  dark:hover:bg-primary-400'
            } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? '감사합니다!' : '구독하기'}
          </button>
        </div>
      </form>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
      )}
    </div>
  )
}

export default forwardRef(NewsletterForm)

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
