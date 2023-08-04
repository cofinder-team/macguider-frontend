import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'

export default function ProgressBar({ currentStepIndex, totalSteps, movePrevStep }) {
  const onClickBtn = useCallback(() => {
    movePrevStep()
  }, [movePrevStep])

  return (
    <div className="relative z-10 px-6">
      <div className="flex items-center justify-between">
        <span className="ml-auto text-xs text-gray-400">
          {currentStepIndex}/{totalSteps}
        </span>
      </div>
      <div className="mt-2 flex items-center space-x-2 text-gray-400">
        <div className="cursor-pointer" onClick={onClickBtn}>
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </div>

        <div className="h-4 w-full rounded-full bg-gray-200 ">
          <div
            className="h-full rounded-full bg-gray-600"
            style={{ width: `${(currentStepIndex / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
