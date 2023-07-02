import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'

const StickyBanner = () => {
  const [bannerOpened, setBannerOpened] = useState(true)
  const onClickSendFeedback = useCallback(() => {
    amplitudeTrack('click_send_feedback')
  }, [])

  return (
    bannerOpened && (
      <div
        id="sticky-banner"
        tabIndex="-1"
        className="sticky top-0 z-40 flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
      >
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-gray-900 dark:text-gray-400">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="ml-3 block md:ml-2">
              더 나은 MacGuider를 위해
              <br className="block md:hidden" />
              <a
                href="https://tally.so/r/mYRpxz"
                className="decoration-600 dark:decoration-500 inline font-medium text-blue-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-blue-500 md:ml-1.5"
                target="_blank"
                rel="noreferrer"
                onClick={onClickSendFeedback}
              >
                피드백 보내기 &rarr;
              </a>
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <button
            data-dismiss-target="#sticky-banner"
            type="button"
            className="inline-flex flex-shrink-0 items-center justify-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setBannerOpened(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
            <span className="sr-only">Close banner</span>
          </button>
        </div>
      </div>
    )
  )
}

export default StickyBanner
