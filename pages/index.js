import { PageSEO } from '@/components/SEO'
import React, { useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import NewsletterForm from '@/components/NewsletterForm'
import macModels from '@/data/models/mac'
import ipadModels from '@/data/models/ipad'
import ModelCard from '@/components/ModelCard'

import SectionDesk from '@/components/section/desk'
import Link from '@/components/Link'
import Promo from '@/components/Promo'
import amplitudeTrack from '@/lib/amplitude/track'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home() {
  useEffect(() => {
    amplitudeTrack('page_view', { page_type: 'main', page_detail: 'main' })
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pb-2 md:pt-6">
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
        <div className="space-y-2 pb-2 pt-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
              아이패드 시세
            </h1>
            <div className="mx-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              New
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

      <SectionDesk />

      <Promo />

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
