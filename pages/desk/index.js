import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'
import SectionDesk from '@/components/section/desk'

export default function Desk() {
  return (
    <>
      <PageSEO
        title={`오늘의 데스크`}
        description={`애플 제품과 가장 잘 어울리는 데스크를 소개합니다.`}
      />

      <SectionDesk />

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
