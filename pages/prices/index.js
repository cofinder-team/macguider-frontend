import siteMetadata from '@/data/siteMetadata'
import macModels from '@/data/models/mac'
import ModelCard from '@/components/ModelCard'
import { PageSEO } from '@/components/SEO'
import ipadModels from '@/data/models/ipad'
import NewsletterForm from '@/components/NewsletterForm'
import Promo from '@/components/Promo'

export default function Projects() {
  return (
    <>
      <PageSEO title={'시세 정보'} description={'사양별 맥북과 아이패드의 시세를 알려드립니다'} />

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pt-6 pb-2">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            맥 시세
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            사양별 맥 시세를 알려드립니다
          </p>
        </div>
        <div className="mt-2">
          <div className="-m-4 flex flex-wrap">
            {macModels.map((d) => (
              <ModelCard key={d.title} title={d.title} imgSrc={d.imgSrc} href={d.href} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pt-6 pb-2">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
              아이패드 시세
            </h1>
            <div className="mx-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              Beta
            </div>
          </div>

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            사양별 아이패드 시세를 알려드립니다
          </p>
        </div>
        <div className="mt-2">
          <div className="-m-4 flex flex-wrap">
            {ipadModels.map((d) => (
              <ModelCard key={d.title} title={d.title} imgSrc={d.imgSrc} href={d.href} />
            ))}
          </div>
        </div>
      </section>
      <Promo />
      <div className="mt-8 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
