import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'
import SectionDesk from '@/components/section/desk'
import Promo from '@/components/Promo'
import { useEffect } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'

export default function Desk() {
  useEffect(() => {
    amplitudeTrack('page_view', { page_type: 'desk', page_detail: 'desk_main' })
  }, [])
  return (
    <>
      <PageSEO
        title={`오늘의 데스크`}
        description={`애플 제품과 가장 잘 어울리는 데스크를 소개합니다.`}
      />

      <SectionDesk />
      <Promo />
      <div className="mt-8 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
