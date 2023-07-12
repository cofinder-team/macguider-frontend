import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'
import SectionDesk from '@/components/section/desk'
import Promo from '@/components/Promo'
import { useCallback, useEffect } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import HotdealLayout from '@/layouts/HotdealLayout'
import Image from '@/components/Image'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function HotDeal() {
  useEffect(() => {
    amplitudeTrack('enter_page_hot_deal')
  }, [])

  const router = useRouter()

  return (
    <>
      <PageSEO title={`중고 핫딜`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <HotdealLayout
        leftCol={
          <img
            alt={`중고 핫딜 이미지`}
            src={
              'https://static.waveon.io/img/apps/18146/제목을 입력해주세요_-001 (5).jpg'
            }
            className="h-96  w-full rounded-t-lg object-cover object-center "
          />
        }
        rightCol={
          <div className="mt-5 space-y-8">
            <div>
              <div className="mb-3 flex items-center justify-between gap-x-6 rounded-md bg-gradient-to-br from-purple-600 to-blue-500  px-3 py-2.5 sm:pr-3.5 md:px-6 lg:pl-8">
                <p className="text-sm leading-6 text-white">
                  <strong className="text-lg font-bold ">15% 이상 저렴</strong>
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-2 inline h-0.5 w-0.5 fill-current"
                    aria-hidden="true"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <span className="text-base">초 희귀한 놀라운 가격</span>
                </p>
              </div>

              <div className="space-y-2">
                {
                  // select  maximum 4 random desks
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map((id) => (
                      <div
                        key={id}
                        className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow"
                      >
                        <div className="relative h-full w-1/3">
                          <img
                            alt={'hello'}
                            src={'/static/images/ipads/ipad-pro-11-2022.png'}
                            className="h-full w-full object-contain object-center"
                          />
                          {/* <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-base  font-extrabold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div> */}
                        </div>

                        <div className="flex-1 truncate pl-3">
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
                            <span className="font-bold text-red-500">53%</span>
                            <div className="ml-1 font-bold text-gray-900">1,920,000원</div>
                          </div>
                          <div className="text-xs  text-gray-500">
                            <span>평균 중고가&nbsp;</span>
                            1,920,000원
                          </div>
                        </div>
                      </div>
                    ))
                    .slice(0, 4)
                }
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-x-6 rounded-md bg-gradient-to-br from-green-400 to-blue-600 px-3 py-2.5 sm:pr-3.5 md:px-6 lg:pl-8">
                <p className="text-sm leading-6 text-white">
                  <strong className="text-lg font-bold ">10% 이상 저렴</strong>
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-2 inline h-0.5 w-0.5 fill-current"
                    aria-hidden="true"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <span className="text-base">보기 힘든 가격</span>
                </p>
              </div>

              <div className="space-y-2">
                {
                  // select  maximum 4 random desks
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map((id) => (
                      <div
                        key={id}
                        className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow"
                      >
                        <div className="relative h-full w-1/3">
                          <img
                            alt={'hello'}
                            src={'/static/images/ipads/ipad-pro-11-2022.png'}
                            className="h-full w-full object-contain object-center"
                          />
                          {/* <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-base  font-extrabold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div> */}
                        </div>

                        <div className="flex-1 truncate pl-3">
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
                            <span className="font-bold text-red-500">53%</span>
                            <div className="ml-1 font-bold text-gray-900">1,920,000원</div>
                          </div>
                          <div className="text-xs  text-gray-500">
                            <span>평균 중고가&nbsp;</span>
                            1,920,000원
                          </div>
                        </div>
                      </div>
                    ))
                    .slice(0, 4)
                }
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-x-6 rounded-md bg-gray-600 bg-gradient-to-br px-3 py-2.5 sm:pr-3.5 md:px-6 lg:pl-8">
                <p className="text-sm leading-6 text-white">
                  <strong className="text-lg font-bold ">판매완료</strong>
                  <svg
                    viewBox="0 0 2 2"
                    className="mx-2 inline h-0.5 w-0.5 fill-current"
                    aria-hidden="true"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <span className="text-base">아쉽지만 내일 만나요!</span>
                </p>
              </div>

              <div className="space-y-2">
                {
                  // select  maximum 4 random desks
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map((id) => (
                      <div
                        key={id}
                        className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow"
                      >
                        <div className="relative h-full w-1/3">
                          <img
                            alt={'hello'}
                            src={'/static/images/ipads/ipad-pro-11-2022.png'}
                            className="h-full w-full object-contain object-center"
                          />
                          <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-base  font-extrabold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 truncate pl-3">
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
                            <span className="font-bold text-red-500">53%</span>
                            <div className="ml-1 font-bold text-gray-900">1,920,000원</div>
                          </div>
                          <div className="text-xs  text-gray-500">
                            <span>평균 중고가&nbsp;</span>
                            1,920,000원
                          </div>
                        </div>
                      </div>
                    ))
                    .slice(0, 4)
                }
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
          </div>
        }
      />
    </>
  )
}
