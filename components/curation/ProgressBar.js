import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProgressBar() {
  return (
    <div className="px-6">
      <div className="flex items-center justify-between">
        <span className="ml-auto text-xs text-gray-400">1/6</span>
      </div>
      <div className="mt-2 flex items-center space-x-2 text-gray-400">
        <FontAwesomeIcon icon={faCircleChevronLeft} />

        <div className="h-4 w-full rounded-full bg-gray-200 ">
          <div className="h-full w-1/4 rounded-full bg-gray-600"></div>
        </div>
      </div>
    </div>
  )
}
