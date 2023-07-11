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

export default function HotDeal() {
  useEffect(() => {
    amplitudeTrack('enter_page_hot_deal')
  }, [])

  const onClickUploadDesk = useCallback(() => {
    amplitudeTrack('click_upload_desk')
    window.open('https://tally.so/r/w54A6v', '_blank')
  }, [])

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
          <div className="space-y-8">
            <div>
              <div className="mb-3 flex items-center justify-between gap-x-6 rounded-md bg-gradient-to-br from-purple-600 to-blue-500  px-3 py-2.5 sm:pr-3.5 md:px-6 lg:pl-8">
                <p className="text-sm leading-6 text-white">
                  <a href="#">
                    <strong className="text-lg font-bold ">초핫딜</strong>
                    <svg
                      viewBox="0 0 2 2"
                      className="mx-2 inline h-0.5 w-0.5 fill-current"
                      aria-hidden="true"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <span className="text-md">
                      현재 중고시세보다 <strong>10% 이상</strong> 저렴한 제품
                    </span>
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {
                  // select  maximum 4 random desks
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map((id) => (
                      <div
                        key={id}
                        className="w-full max-w-sm cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow"
                      >
                        <div className="relative">
                          <Image
                            alt={'hello'}
                            src={'/static/images/ipads/ipad-pro-11-2022.png'}
                            className="object-contain object-center md:h-36 lg:h-48"
                            width={544}
                            height={306}
                            priority={true}
                          />

                          <div className=" text-md absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black  font-extrabold text-white opacity-70">
                            판매완료
                          </div>
                        </div>

                        <div className="px-3 pb-3 xl:px-5 xl:pb-5">
                          <div className="items-center space-x-1 py-2 selection:flex">
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              중고나라
                            </span>
                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                              S급
                            </span>
                          </div>

                          <h5 className="truncate text-lg font-semibold tracking-tight text-gray-900">
                            MacBook Pro 13-inch M1 2020
                          </h5>

                          <div className="flex items-center ">
                            <span className="text-lg font-bold text-red-600">53%</span>

                            <div className="ml-1 text-sm  text-gray-500 line-through ">
                              1,920,000원
                            </div>
                          </div>
                          <div className="text-md font-bold text-gray-900 ">1,920,000원</div>
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
                  <a href="#">
                    <strong className="text-lg font-bold ">꿀딜</strong>
                    <svg
                      viewBox="0 0 2 2"
                      className="mx-2 inline h-0.5 w-0.5 fill-current"
                      aria-hidden="true"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <span className="text-md">
                      현재 중고시세보다 <strong>5% 이상</strong> 저렴한 제품
                    </span>
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {
                  // select  maximum 4 random desks
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map((id) => (
                      <div
                        key={id}
                        className="w-full max-w-sm cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow"
                      >
                        <div className="relative">
                          <Image
                            alt={'hello'}
                            src={'/static/images/ipads/ipad-pro-11-2022.png'}
                            className="object-contain object-center md:h-36 lg:h-48"
                            width={544}
                            height={306}
                            priority={true}
                          />

                          <div className=" text-md absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black  font-extrabold text-white opacity-70">
                            판매완료
                          </div>
                        </div>

                        <div className="px-5 pb-5">
                          <div className="items-center space-x-1 py-2 selection:flex">
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              중고나라
                            </span>
                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                              S급
                            </span>
                          </div>

                          <h5 className="truncate text-lg font-semibold tracking-tight text-gray-900">
                            MacBook Pro 13-inch M1 2020
                          </h5>

                          <div className="flex items-center ">
                            <span className="text-lg font-bold text-red-600">53%</span>

                            <div className="ml-1 text-sm  text-gray-500 line-through ">
                              1,920,000원
                            </div>
                          </div>
                          <div className="text-md font-bold text-gray-900 ">1,920,000원</div>
                        </div>
                      </div>
                    ))
                    .slice(0, 4)
                }
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}
