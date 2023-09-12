import { PageSEO } from '@/components/SEO'
import React, { useCallback, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from '@/components/NewsletterForm'
import ModelCard from '@/components/ModelCard'
import SectionDesk from '@/components/section/desk'
import Link from '@/components/Link'
import Promo from '@/components/Promo'
import amplitudeTrack from '@/lib/amplitude/track'
import { getModels } from 'utils/model'

interface Props {
  models: MainItemResponse[]
}

export default function Home({ models }: Props) {
  useEffect(() => {
    amplitudeTrack('enter_home')
  }, [])

  const getModelsByType = useCallback(
    (type: ModelType) => {
      if (!models) return []

      return models.filter((model) => model.type === type)
    },
    [models]
  )

  const generateModelHref = useCallback((model: MainItemResponse) => {
    switch (model.type) {
      case 'M':
        return `/prices/mac/${model.mainItem.id}`
      case 'P':
        return `/prices/ipad/${model.mainItem.id}`
      case 'I':
        return `/prices/iphone/${model.mainItem.id}`
    }
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pb-2 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            맥 시세
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            사양별 맥 시세를 알려드립니다
          </p>
        </div>
        <div className="mt-2">
          <div className="-m-4 flex flex-wrap">
            {getModelsByType('M').map((model) => (
              <ModelCard
                key={model.id}
                title={model.name}
                imgSrc={model.mainItem.image.url}
                href={generateModelHref(model)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pb-2 pt-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
              아이패드 시세
            </h1>
          </div>

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            사양별 아이패드 시세를 알려드립니다
          </p>
        </div>
        <div className="mt-2">
          <div className="-m-4 flex flex-wrap">
            {getModelsByType('P').map((model) => (
              <ModelCard
                key={model.id}
                title={model.name}
                imgSrc={model.mainItem.image.url}
                href={generateModelHref(model)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pb-2 pt-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
              아이폰 시세
            </h1>
          </div>

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            사양별 아이폰 시세를 알려드립니다
          </p>
        </div>
        <div className="mt-2">
          <div className="-m-4 flex flex-wrap">
            {getModelsByType('I').map((model) => (
              <ModelCard
                key={model.id}
                title={model.name}
                imgSrc={model.mainItem.image.url}
                href={generateModelHref(model)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pb-2 pt-6">
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
      </section>

      <Promo />

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const models = await getModels()

  return {
    props: {
      models,
    },
  }
}
