import { faChevronLeft, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'

export default function ProgressBar({ currentStepIndex, totalSteps, movePrevStep }) {
  const onClickBtn = useCallback(() => {
    movePrevStep()
  }, [movePrevStep])

  return (
    <div className="relative z-10">
      <div className="mt-2 flex items-center space-x-2 text-gray-600">
        <div className="cursor-pointer p-3" onClick={onClickBtn}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>

        <div className="flex h-4 w-full items-center space-x-1 px-12">
          {Array.from({ length: totalSteps }).map((step, index) => {
            return (
              <div
                className="h-[3px] rounded-full"
                key={index}
                style={{
                  width: (1 / totalSteps) * 100 + '%',
                  backgroundColor: index < currentStepIndex ? '#00FF00' : '#8F8F94',
                }}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
