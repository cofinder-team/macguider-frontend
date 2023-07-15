import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '@/components/Image'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'

const categories = ['10% 이상 저렴', '5% 이상 저렴', '판매완료']

export default function HotDeal() {
  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  const [currentCategory, setCurrentCategory] = useState('10% 이상 저렴')

  const router = useRouter()

  const onClickCategory = useCallback((category) => {
    setCurrentCategory(category)
  }, [])

  return (
    <>
      <PageSEO title={`중고 꿀매 찾기`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <h1 className="text-2xl font-bold">MacGuider 보물찾기</h1>
      <p className="mt-1 text-base font-semibold text-gray-500">
        <span className="text-blue-600">매일 10시</span> 중고로 판매 중인 제품 중 <br />
        저렴한 제품을 모아 알려드려요
      </p>

      <div className="mt-2  text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          {categories.map((category) => (
            <li
              className="mr-2 cursor-pointer"
              key={category}
              onClick={() => {
                onClickCategory(category)
              }}
            >
              <span
                className={`inline-block rounded-t-lg border-b-2 border-transparent p-2  
              ${
                currentCategory === category
                  ? 'border-gray-800 font-bold text-gray-800'
                  : 'hover:border-gray-300 hover:text-gray-600'
              }
              `}
              >
                {category}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
          <div className="flex-1 truncate">
            <div className="items-center space-x-1  selection:flex">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                중고나라
              </span>

              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                S급
              </span>
            </div>

            <h5 className="mt-1 truncate  text-sm font-semibold tracking-tight text-gray-900">
              MacBook Pro 13-inch M1 2020
            </h5>

            <div className=" flex items-center text-lg">
              <div className="font-bold text-gray-900">1,920,000원</div>
            </div>
            <div className="text-xs  text-gray-500">
              <span>평균 중고가&nbsp;</span>
              1,920,000원
            </div>
          </div>

          <div className="relative flex h-full w-1/5 max-w-[100px] items-center">
            <div className="aspect-1 overflow-hidden rounded-md">
              <img
                alt={'hello'}
                src={'https://static.waveon.io/img/apps/18146/KakaoTalk_20230712_085626802.jpg'}
                className="h-full w-full object-contain object-center"
              />
            </div>

            {/* <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-base  font-extrabold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div> */}
          </div>
        </div>
        <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
          <div className="flex-1 truncate">
            <div className="items-center space-x-1  selection:flex">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                중고나라
              </span>

              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                S급
              </span>
            </div>

            <h5 className="mt-1 truncate  text-sm font-semibold tracking-tight text-gray-900">
              MacBook Pro 13-inch M1 2020
            </h5>

            <div className=" flex items-center text-lg">
              <div className="font-bold text-gray-900">1,920,000원</div>
            </div>
            <div className="text-xs  text-gray-500">
              <span>평균 중고가&nbsp;</span>
              1,920,000원
            </div>
          </div>

          <div className="relative flex h-full w-1/5 max-w-[100px] items-center">
            <div className="aspect-1 overflow-hidden rounded-md">
              <img
                alt={'hello'}
                src={'https://static.waveon.io/img/apps/18146/KakaoTalk_20230712_085626802.jpg'}
                className="h-full w-full object-contain object-center"
              />
            </div>

            {/* <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-base  font-extrabold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div> */}
          </div>
        </div>
        <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
          <div className="flex-1 truncate">
            <div className="items-center space-x-1  selection:flex">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                중고나라
              </span>

              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                S급
              </span>
            </div>

            <h5 className="mt-1 truncate  text-sm font-semibold tracking-tight text-gray-900">
              MacBook Pro 13-inch M1 2020
            </h5>

            <div className=" flex items-center text-lg">
              <div className="font-bold text-gray-900">1,920,000원</div>
            </div>
            <div className="text-xs  text-gray-500">
              <span>평균 중고가&nbsp;</span>
              1,920,000원
            </div>
          </div>

          <div className="relative flex h-full w-1/5 max-w-[100px] items-center">
            <div className="aspect-1 overflow-hidden rounded-md">
              <img
                alt={'hello'}
                src={'https://static.waveon.io/img/apps/18146/KakaoTalk_20230712_085626802.jpg'}
                className="h-full w-full object-contain object-center"
              />
            </div>

            {/* <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-base  font-extrabold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div> */}
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white">
            <a href="https://tally.so/r/mOlRPM">
              매일 중고 핫딜이 시작되면 알려드릴게요
              <span className="ml-2 inline-block ">
                <span aria-hidden="true" className="inline-block">
                  &rarr;
                </span>
              </span>
            </a>
          </p>
          <button type="button" className="-m-1.5 flex-none p-1.5">
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}
