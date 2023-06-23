import { PageSEO } from '@/components/SEO'
import React, { useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import NewsletterForm from '@/components/NewsletterForm'
import macModels from '@/data/models/mac'
import ipadModels from '@/data/models/ipad'
import ModelCard from '@/components/ModelCard'

import amplitude from 'amplitude-js'
import SectionDesk from '@/components/section/desk'
import Link from '@/components/Link'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home() {
  useEffect(() => {
    amplitude.getInstance().logEvent('page_view', { page_type: 'main', page_detail: 'main' })
  }, [])

  const products = [
    {
      id: 1,
      name: 'Fusion',
      category: 'UI Kit',
      href: '#',
      price: '$49',
      imageSrc: '/static/images/desk.png',
      imageAlt:
        'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
      id: 2,
      name: 'Fusion',
      category: 'UI Kit',
      href: '#',
      price: '$49',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
      imageAlt:
        'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
      id: 3,
      name: 'Fusion',
      category: 'UI Kit',
      href: '#',
      price: '$49',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
      imageAlt:
        'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
      id: 4,
      name: 'Fusion',
      category: 'UI Kit',
      href: '#',
      price: '$49',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
      imageAlt:
        'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    // More products...
  ]

  const files = [
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    // More files...
  ]

  const posts = [
    {
      title: '맥 구매 가이드',
      summary:
        '맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 ',
      slug: 'mac-buying-guide',
    },
    {
      title: '애플농장',
      summary:
        '맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 맥 구매 가이드 ',
      slug: 'apple-farm',
    },
  ]
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="overflow-hidden pt-32 sm:pt-14">
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative pb-10 pt-48 sm:pb-24 md:pt-16">
              <div>
                <div className="mb-2 w-max rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  New
                </div>
                <h2
                  id="sale-heading"
                  className="text-4xl font-bold leading-10 tracking-tight md:text-5xl"
                >
                  Mac과 찰떡궁합인
                  <br />
                  오늘의 데스크
                </h2>
                <div className="mt-6 text-base">
                  <Link href="/desk" className="font-semibold ">
                    구경하기
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>

              <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src="https://static.waveon.io/img/apps/18146/IMG_0226.jpeg"
                        alt="desk-1"
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src="https://static.waveon.io/img/apps/18146/스크린샷_2023-05-25_오후_10.57.59 (1).png
                        "
                        alt="desk-2"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src="https://static.waveon.io/img/apps/18146/IMG_5222.JPG"
                        alt="desk-3"
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src="https://static.waveon.io/img/apps/18146/IMG_9393.jpeg"
                        alt="desk-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="space-y-2 pt-6 pb-2">
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

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
