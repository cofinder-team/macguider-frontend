import { Fragment, useState } from 'react'
import { PageSEO } from '@/components/SEO'
import desks from '@/data/desks'
import DeskSection from '@/components/desks/section'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export default function Example({ deskId }) {
  const desk = desks.find((desk) => desk.id === deskId)
  const router = useRouter()

  return (
    <>
      <PageSEO
        title={`오늘의 데스크`}
        description={'맥과 가장 잘 어울리는 데스크 셋업을 소개합니다.'}
      />

      <section className="bg-white pt-8 pb-16 dark:bg-gray-900 lg:pt-16 lg:pb-24">
        <div className="mx-auto flex max-w-screen-xl justify-between ">
          <article className="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl">
            <div className=" mb-4 lg:mb-6">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-4xl">
                {desk.name}
              </h1>

              <address className="flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                    src="https://static.waveon.io/img/apps/18146/macguider_profile_square.001.jpeg"
                    alt="author-profile-image"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      맥가이더 에디터
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
                        2023년 6월 25일
                      </time>
                    </p>
                  </div>
                </div>
              </address>
            </div>

            <div
              className="mb-3 flex rounded-lg bg-gray-50 p-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="mr-2 inline h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-bold">공지</span> 본 글의 사진 및 텍스트는 원작자로부터 허가를
                받아 게시되었습니다.
              </div>
            </div>

            <div className="space-y-9">
              {desk.sections.map((section) => (
                <DeskSection key={section.id} desk={section} />
              ))}
            </div>
          </article>
        </div>
      </section>

      <aside aria-label="Related articles" className=" lg:py-24">
        <div className="mx-auto max-w-screen-xl md:px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">다른 데스크</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {desks
              .filter((desk) => desk.id !== deskId)
              .map(({ id, name, imageSrc, author, href, imageAlt }) => (
                <div
                  key={id}
                  className="group relative cursor-pointer"
                  onClick={() => {
                    router.push(href)
                  }}
                >
                  <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                    <img src={imageSrc} alt={imageAlt} className="object-cover object-center" />
                    <div
                      className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        구경하러 가기
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-base font-medium text-gray-900">
                    <h3>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{author}</p>
                </div>
              ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export function getServerSideProps(context) {
  const { deskId } = context.query

  return {
    props: {
      deskId,
    },
  }
}
