import { Fragment, useState } from 'react'
import { PageSEO } from '@/components/SEO'
import desks from '@/data/desks'
import DeskSection from '@/components/desks/section'

export default function Example({ deskId }) {
  const desk = desks.find((desk) => desk.id === deskId)

  return (
    <>
      <PageSEO
        title={`오늘의 데스크 - Simple Motive`}
        description={'오늘의 데스크를 소개합니다.'}
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
                    className="mr-4 h-12 w-12 rounded-full"
                    src="/static/images/desk.png"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      맥가이더
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
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
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                  className="mb-5 rounded-lg"
                  alt="Image 1"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first office</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After months of
                preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 underline underline-offset-4 hover:no-underline dark:text-primary-500"
              >
                Read in 2 minutes
              </a>
            </article>
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                  className="mb-5 rounded-lg"
                  alt="Image 2"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Enterprise design tips</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After months of
                preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 underline underline-offset-4 hover:no-underline dark:text-primary-500"
              >
                Read in 12 minutes
              </a>
            </article>
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
                  className="mb-5 rounded-lg"
                  alt="Image 3"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">We partnered with Google</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After months of
                preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 underline underline-offset-4 hover:no-underline dark:text-primary-500"
              >
                Read in 8 minutes
              </a>
            </article>
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
                  className="mb-5 rounded-lg"
                  alt="Image 4"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first project with React</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After months of
                preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 underline underline-offset-4 hover:no-underline dark:text-primary-500"
              >
                Read in 4 minutes
              </a>
            </article>
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
