import { PageSEO } from '@/components/SEO'
import React, { useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import NewsletterForm from '@/components/NewsletterForm'
import ModelCard from '@/components/ModelCard'
import SectionDesk from '@/components/section/desk'
import Link from '@/components/Link'
import Promo from '@/components/Promo'
import amplitudeTrack from '@/lib/amplitude/track'
import optionsMac from '@/data/options/mac'
import optionsIpad from '@/data/options/ipad'
import Image from 'next/image'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home() {
  useEffect(() => {
    amplitudeTrack('enter_home')
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <img
        src={
          'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTJfMTU1/MDAxNjg5MTY4NzU2Mjcx.xEx-C-cZqxl0pT-QRP3vFAbd-DY3GKIoFcEm_yOYORog.0rkPGcHHMCRan69vP6cwMo69MGc_-lALk070v_Y_Ec4g.JPEG/B9E8F8FE-BD25-40C3-AB00-FABAC51533F3.jpeg'
        }
        alt="test"
      />
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
            {optionsMac.map((mac) => (
              <ModelCard key={mac.id} title={mac.model} imgSrc={mac.imgSrc} href={mac.href} />
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
            {optionsIpad.map((ipad) => (
              <ModelCard key={ipad.id} title={ipad.model} imgSrc={ipad.imgSrc} href={ipad.href} />
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
