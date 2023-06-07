import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import NewsletterForm from '@/components/NewsletterForm'
import macModels from '@/data/models/mac'
import ipadModels from '@/data/models/ipad'
import ModelCard from '@/components/ModelCard'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home() {
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

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pt-6 pb-2">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            맥 가이드
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            스마트한 맥 라이프를 위한 가이드를 제공합니다
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <div
                key={title}
                className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
              >
                <a href="#">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{summary}</p>
                <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                  보러가기
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
              </div>

              // <li key={slug} className="py-6">
              //   <article>
              //     <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              //       <div className="space-y-5 xl:col-span-3">
              //         <div className="space-y-6">
              //           <div>
              //             <h2 className="text-2xl font-bold leading-8 tracking-tight">
              //               <Link
              //                 href={`/blog/${slug}`}
              //                 className="text-gray-900 dark:text-gray-100"
              //               >
              //                 {title}
              //               </Link>
              //             </h2>
              //             <div className="flex flex-wrap">
              //               {tags.map((tag) => (
              //                 <Tag key={tag} text={tag} />
              //               ))}
              //             </div>
              //           </div>
              //           <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              //             {summary}
              //           </div>
              //         </div>
              //         <div className="text-base font-medium leading-6">
              //           <Link
              //             href={`/blog/${slug}`}
              //             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              //             aria-label={`Read "${title}"`}
              //           >
              //             Read more &rarr;
              //           </Link>
              //         </div>
              //       </div>
              //     </div>
              //   </article>
              // </li>
            )
          })}
        </ul>
      </section>

      <div className="mt-md-6 mt-3 flex items-center justify-center pt-4">
        <NewsletterForm />
      </div>
    </>
  )
}
