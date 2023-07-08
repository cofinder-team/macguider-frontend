import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'
import SectionDesk from '@/components/section/desk'
import Promo from '@/components/Promo'
import { useEffect } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'

export default function Desk() {
  useEffect(() => {
    amplitudeTrack('enter_desk_main')
  }, [])
  return (
    <>
      <PageSEO
        title={`오늘의 데스크`}
        description={`애플 제품과 가장 잘 어울리는 데스크를 소개합니다.`}
      />

      <div className="space-y-2 pt-6 pb-2">
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            오늘의 데스크
          </h1>
          <div className="mx-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            New
          </div>
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
