import { useCallback, useEffect, useRef, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import HotdealAlert from './modal/HotdealAlert'

const HotdealBanner = ({ currentFilter }) => {
  const modalRef = useRef(null)

  const { label, value } = currentFilter
  const [modelType, modelId] = value

  const onApply = useCallback(() => {
    alert('알림이 등록되었습니다. 지금 마이페이지에서 확인해보세요!')
  }, [])

  const onClickGetNotification = useCallback(() => {
    amplitudeTrack('click_get_new_deals_notification')

    if (modalRef.current) {
      modalRef.current.setOpen(true)
    }
  }, [])

  return (
    <>
      <div className=" fixed inset-x-0 bottom-0 z-20 flex justify-center px-8 pb-5">
        <div
          onClick={onClickGetNotification}
          className="inline-flex cursor-pointer items-center justify-between gap-x-6 rounded-full bg-gray-900 px-6 py-2.5 sm:py-3 "
        >
          <p className="font-base text-sm leading-6 text-white">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            {label === '전체' ? (
              <span className="font-bold">원하는 제품 알림 받기</span>
            ) : (
              <>
                <span className="font-bold">{label}</span>&nbsp;알림 받기
              </>
            )}
          </p>
        </div>
      </div>

      <HotdealAlert
        ref={modalRef}
        modelId={Number(modelId)}
        modelType={modelType}
        onApply={onApply}
      />
    </>
  )
}

export default HotdealBanner
