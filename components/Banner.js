import { useCallback, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Banner = () => {
  const [bannerOpened, setBannerOpened] = useState(true)
  const onClickGetNotification = useCallback(() => {
    amplitudeTrack('click_get_new_deals_notification')
  }, [])

  const onClickCloseBanner = useCallback(() => {
    setBannerOpened(false)
  }, [])

  return (
    bannerOpened && (
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white">
            <a href="https://tally.so/r/mOlRPM" target="_blank" rel="noreferrer">
              관심있는 제품이 올라오면 바로 알려드릴게요!
              <span className="ml-2 inline-block" onClick={onClickGetNotification}>
                <span aria-hidden="true" className="inline-block">
                  &rarr;
                </span>
              </span>
            </a>
          </p>
          <button type="button" className="-m-1.5 flex-none p-1.5" onClick={onClickCloseBanner}>
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  )
}

export default Banner
