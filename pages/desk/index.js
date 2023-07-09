import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'
import SectionDesk from '@/components/section/desk'
import Promo from '@/components/Promo'
import { useCallback, useEffect } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Desk() {
  useEffect(() => {
    amplitudeTrack('enter_desk_main')
  }, [])

  const onClickUploadDesk = useCallback(() => {
    amplitudeTrack('click_upload_desk')
    window.open('https://tally.so/r/w54A6v', '_blank')
  }, [])

  return (
    <>
      <PageSEO
        title={`오늘의 데스크`}
        description={`애플 제품과 가장 잘 어울리는 데스크를 소개합니다.`}
      />

      <div className="space-y-2 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            오늘의 데스크
          </h1>

          <button
            onClick={onClickUploadDesk}
            className="flex w-32 items-center justify-center rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-gray-300 "
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2 inline-block">데스크 올리기</span>
          </button>
        </div>

        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          애플 제품과 찰떡궁합인 제품들을 소개합니다
        </p>
      </div>

      <SectionDesk />
      <Promo />
      <div className="mt-8 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
