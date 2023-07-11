import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'
import SectionDesk from '@/components/section/desk'
import Promo from '@/components/Promo'
import { useCallback, useEffect, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import HotdealLayout from '@/layouts/HotdealLayout'
import Image from '@/components/Image'
import Skeleton from 'react-loading-skeleton'
import useAsync from 'hooks/useAsync'
import { getPrices } from 'utils/price'
import { useRouter } from 'next/router'
import { pastTime } from '@/lib/utils/pastTime'
import { useScreenSize } from 'hooks/useScreenSize'
import CoupangLogo from '@/data/coupang_logo.svg'

export default function HotDeal() {
  const [unopened, setUnopened] = useState('false')

  let currentItem = null

  useEffect(() => {
    amplitudeTrack('enter_page_hot_deal')
  }, [])

  const { sm, md, lg } = useScreenSize()

  // 가격 조회
  const [state, refetch] = useAsync(getPrices, [1, 1, unopened], [])
  const { loading, data: fetchedData, error } = state

  const router = useRouter()

  // 가격 데이터 fetch 실패시 alert창 띄우기
  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const getPriceByLevel = useCallback(
    (level) => {
      const price = fetchedData.data.filter((data) => data && data[level]).slice(-1)[0]

      if (price) {
        return price[level]
      }
    },
    [fetchedData]
  )

  // 미개봉 상태 변경
  const onInputOptionUnopened = useCallback((status) => {
    setUnopened(status)

    amplitudeTrack('click_select_option', {
      item_class: 'mac',
      item_detail: 'few',
      option_type: 'unopened',
      option_value: status,
    })
  }, [])

  const onInputPlatform = useCallback((platform) => {
    if (platform !== '중고나라') {
      amplitudeTrack('click_change_platform', {
        platform,
      })
      alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')
    }
  }, [])

  const getCoupangPrice = useCallback(() => {
    if (fetchedData) {
      const coupangPrice = fetchedData.coupang.slice(-1)[0]?.price

      if (coupangPrice) {
        return coupangPrice
      }
    }
  }, [fetchedData])

  const getCoupangLastUpdatedTime = useCallback(() => {
    if (fetchedData) {
      const lastUpdatedTime = fetchedData.time
      const now = new Date()
      const lastUpdated = new Date(lastUpdatedTime)
      const diffTime = Math.abs(now - lastUpdated)
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const diffMinutes = Math.ceil(diffTime / (1000 * 60))

      if (diffDays > 0) {
        return `${diffDays}일 전`
      }

      if (diffMinutes > 60) {
        return `${Math.floor(diffMinutes / 60)}시간 전`
      }

      return `${diffMinutes}분 전`
    }
  }, [fetchedData])

  return (
    <>
      <PageSEO title={`중고 핫딜`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <HotdealLayout
        leftCol={
          <div className="relative min-h-[360px] px-6 md:p-6">
            <div className="text-2xl font-normal leading-8 ">
              <div>이 제품은 평균 시세보다</div>

              <div>
                <span className="font-bold underline">12만원</span>&nbsp;저렴해요
              </div>
            </div>

            <ul className="mt-3">
              <li className=" bg-gray-100 py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      중고나라
                    </p>
                  </div>
                  <div className="pr-2 text-right text-base font-semibold text-gray-900">
                    {loading || !fetchedData ? (
                      <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                    ) : getPriceByLevel('mid') ? (
                      <>
                        <span>{getPriceByLevel('mid').toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>

                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          <div className="truncate text-xs">
                            <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                            <span className="truncate text-gray-600">{pastTime()}</span>
                          </div>
                        </p>
                      </>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
              </li>
              <li className=" py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="w-16 truncate text-sm font-medium text-gray-900 grayscale dark:text-white">
                      <CoupangLogo />
                    </p>
                  </div>
                  <div className="pr-2 text-right text-base font-semibold text-gray-900">
                    {loading || !fetchedData ? (
                      <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                    ) : getCoupangPrice() ? (
                      <>
                        <span>{getCoupangPrice().toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>

                        <div className="truncate text-xs">
                          <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                          <span className="truncate text-gray-600">
                            {getCoupangLastUpdatedTime()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>품절</span>
                    )}
                  </div>
                </div>
              </li>

              <li className="bg-gray-100 py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      애플스토어
                    </p>
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">단종</div>
                </div>
              </li>
            </ul>

            <div className="absolute bottom-0 left-0 w-full ">
              <div
                aria-hidden="true"
                className="flex h-[60px] w-full flex-col items-center justify-center bg-gradient-to-t from-white opacity-90"
              ></div>

              <div className="flex w-full flex-col  items-center justify-center bg-white py-6">
                <div className="mb-2 text-center font-semibold">
                  이 제품의 더 많은 정보가 궁금하다면?
                </div>
                <button
                  type="button"
                  className="w-fit rounded-full bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                  onClick={() => router.push('/prices/mac/macbook-pro-16')}
                >
                  더 알아보기
                </button>
              </div>
            </div>
          </div>
        }
        rightCol={
          <iframe
            src="https://m.cafe.naver.com/joonggonara/1000977523"
            className="h-[720px] w-full"
          />
        }
      ></HotdealLayout>
    </>
  )
}
