import amplitudeTrack from '@/lib/amplitude/track'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from 'react'

export default function Feedback({ currentItem, currentOption }) {
  const [currentStep, setCurrentStep] = useState(0)
  const { id: itemId } = currentItem
  const { id: optionId } = currentOption

  const onClickSendFeedback = useCallback(
    (feedback) => {
      amplitudeTrack('click_send_feedback', {
        feedback,
        itemId,
        optionId,
      })

      setCurrentStep(1)
    },
    [itemId, optionId]
  )

  const onClickSendMoreFeedback = useCallback(() => {
    amplitudeTrack('click_send_more_feedback', {
      itemId,
      optionId,
    })
  }, [itemId, optionId])

  return (
    <div className="inline-flex items-center justify-center rounded-lg bg-gray-100  text-base font-medium text-gray-700 md:p-5">
      {currentStep === 0 ? (
        <>
          <span className="font-semibold">정보가 도움이 되었나요?</span>

          <div className="cursor-pointer" onClick={() => onClickSendFeedback('good')}>
            <HandThumbUpIcon className="ml-4 h-6 w-6 hover:fill-blue-300" />
          </div>

          <div className="cursor-pointer" onClick={() => onClickSendFeedback('bad')}>
            <HandThumbDownIcon className="ml-2 h-6 w-6 hover:fill-red-300" />
          </div>
        </>
      ) : (
        <>
          <span className="mr-2 inline-block font-semibold">감사합니다.</span>
          <a
            href="https://tally.so/r/mYRpxz"
            className="decoration-600 dark:decoration-500 inline font-medium text-blue-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-blue-500 md:ml-1.5"
            target="_blank"
            rel="noreferrer"
            onClick={onClickSendMoreFeedback}
          >
            더 주실 피드백이 있나요? &rarr;
          </a>
        </>
      )}
    </div>
  )
}
