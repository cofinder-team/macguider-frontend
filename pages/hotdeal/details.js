import { PageSEO } from '@/components/SEO'

import { useCallback, useEffect, useRef, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import HotdealLayout from '@/layouts/HotdealLayout'
import Image from '@/components/Image'
import Skeleton from 'react-loading-skeleton'
import useAsync from 'hooks/useAsync'
import { getPrices } from 'utils/price'
import { useRouter } from 'next/router'
import { pastTime } from '@/lib/utils/pastTime'
import { useScreenSize } from 'hooks/useScreenSize'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

const rightColumnOffsetY = 112

export default function HotDeal() {
  const [unopened, setUnopened] = useState('false')
  const [isCoverRemoved, setIsCoverRemoved] = useState(false)
  const [fixedElementWidth, setFixedElementWidth] = useState(0)

  const rightColumn = useRef(null)

  const container = useRef(null)
  let currentItem = null

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768

      if (!isMobile && container.current && rightColumn.current) {
        let st = window.pageYOffset || document.documentElement.scrollTop

        if (st > lastScrollTop) {
          // when scroll down
          if (
            rightColumn.current.getBoundingClientRect().bottom >=
            container.current.getBoundingClientRect().bottom
          ) {
            rightColumn.current.style.position = 'absolute'
            rightColumn.current.style.bottom = '0'
            rightColumn.current.style.top = 'auto'
          }
        } else {
          // when scroll up
          if (
            rightColumn.current.getBoundingClientRect().top >= rightColumnOffsetY &&
            rightColumn.current.getBoundingClientRect().bottom ===
              container.current.getBoundingClientRect().bottom
          ) {
            // change the style of left column by changing style without changing class names
            rightColumn.current.style.position = 'fixed'
            rightColumn.current.style.top = `${rightColumnOffsetY}px`
            rightColumn.current.style.bottom = 'auto'
          }
        }
        lastScrollTop = st <= 0 ? 0 : st
      }
    }

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768

      if (rightColumn.current && rightColumn.current.parentNode) {
        const parentWidth = rightColumn.current.parentNode.offsetWidth
        if (isMobile) {
          //   rightColumn.current.style.position = 'static'
          //   rightColumn.current.style.top = 'auto'
          //   rightColumn.current.style.bottom = 'auto'
          setFixedElementWidth(parentWidth)
        } else {
          const newWidth = parentWidth // Set to 50% of parent width

          setFixedElementWidth(newWidth)
        }
      }
    }

    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const onClickIframeCover = useCallback(() => {
    setIsCoverRemoved(true)
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

      <div ref={container} className="container flex">
        <div className="md:w-1/2 md:px-5">
          <div className="space-y-1 text-3xl font-bold">
            <div className="flex items-center">
              <div className="flex cursor-pointer  items-center border-b-2 border-black">
                <span>지금 평균 시세</span>
                <ArrowUpRightIcon className="h-8 w-8" />
              </div>
              <div className="ml-1">보다</div>
            </div>

            <div>
              <span className="text-blue-500 ">120,000원</span>
              &nbsp;더 저렴해요
            </div>
          </div>

          <div className="mt-3">
            <div className="flex h-[184px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow xl:h-[200px]">
              <div className="relative h-full w-1/3">
                <img
                  alt={'hello'}
                  src={'/static/images/ipads/ipad-pro-11-2022.png'}
                  className="h-full w-full object-contain object-center"
                />
              </div>

              <div className="flex-1 truncate pl-3">
                <div className="items-center space-x-1 selection:flex">
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    중고나라
                  </span>
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    S급
                  </span>
                </div>
                <h5 className="mt-1 truncate text-lg font-semibold tracking-tight text-gray-900">
                  MacBook Pro 13-inch M1 2020
                </h5>
                <div className="mt-2">
                  <div className="text-sm font-semibold  text-gray-500 ">평균 시세</div>
                  <div className="text-lg font-bold text-gray-900">1,920,000원</div>
                </div>

                <button
                  type="button"
                  className="mt-2 rounded-full bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  더 알아보기
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between rounded-xl bg-gray-100 px-3 py-2 text-sm xl:py-3 xl:px-5 xl:text-base">
              <div className="font-semibold text-gray-500">핫딜이 시작하면 바로 알려드릴게요!</div>

              <button
                type="button"
                className="rounded-full bg-white px-3 py-2 text-center text-sm font-bold text-blue-600 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 xl:px-5"
              >
                알림 받기
              </button>
            </div>
          </div>

          <div className="relative mt-5 block overflow-hidden rounded-lg md:hidden">
            <iframe
              src="https://m.cafe.naver.com/joonggonara/1000977523"
              className="h-[640px] w-full"
            />

            {!isCoverRemoved && (
              <div
                onClick={onClickIframeCover}
                className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black text-white opacity-80"
              >
                <div className="mb-3">
                  <FontAwesomeIcon icon={faHandPointUp} className="text-4xl" />
                </div>
                스크롤해서 정보를 확인할 수 있어요
              </div>
            )}
          </div>

          <div className="mt-5 md:mt-24">
            <h2 className="text-2xl font-bold">다른 핫딜</h2>

            <div className="mt-3  space-y-3">
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow">
                <div className="relative h-full w-1/3">
                  <img
                    alt={'hello'}
                    src={'/static/images/ipads/ipad-pro-11-2022.png'}
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="text-md absolute  top-0 left-0 flex h-full w-full items-center justify-center  font-extrabold text-white ">
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                      판매완료
                    </div>
                  </div>
                </div>

                <div className="flex-1 truncate pl-3">
                  <div className="items-center space-x-1  selection:flex">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      중고나라
                    </span>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      S급
                    </span>
                  </div>

                  <h5 className="mt-1 truncate text-lg font-semibold tracking-tight text-gray-900">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className="flex items-center ">
                    <span className="text-lg font-bold text-red-600">53%</span>

                    <div className="ml-1 text-sm  text-gray-500 line-through ">1,920,000원</div>
                  </div>
                  <div className="text-md font-bold text-gray-900 ">1,920,000원</div>
                </div>
              </div>
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow">
                <div className="relative h-full w-1/3">
                  <img
                    alt={'hello'}
                    src={'/static/images/ipads/ipad-pro-11-2022.png'}
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="text-md absolute  top-0 left-0 flex h-full w-full items-center justify-center  font-extrabold text-white ">
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                      판매완료
                    </div>
                  </div>
                </div>

                <div className="flex-1 truncate pl-3">
                  <div className="items-center space-x-1  selection:flex">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      중고나라
                    </span>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      S급
                    </span>
                  </div>

                  <h5 className="mt-1 truncate text-lg font-semibold tracking-tight text-gray-900">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className="flex items-center ">
                    <span className="text-lg font-bold text-red-600">53%</span>

                    <div className="ml-1 text-sm  text-gray-500 line-through ">1,920,000원</div>
                  </div>
                  <div className="text-md font-bold text-gray-900 ">1,920,000원</div>
                </div>
              </div>
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow">
                <div className="relative h-full w-1/3">
                  <img
                    alt={'hello'}
                    src={'/static/images/ipads/ipad-pro-11-2022.png'}
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="text-md absolute  top-0 left-0 flex h-full w-full items-center justify-center  font-extrabold text-white ">
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                      판매완료
                    </div>
                  </div>
                </div>

                <div className="flex-1 truncate pl-3">
                  <div className="items-center space-x-1  selection:flex">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      중고나라
                    </span>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      S급
                    </span>
                  </div>

                  <h5 className="mt-1 truncate text-lg font-semibold tracking-tight text-gray-900">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className="flex items-center ">
                    <span className="text-lg font-bold text-red-600">53%</span>

                    <div className="ml-1 text-sm  text-gray-500 line-through ">1,920,000원</div>
                  </div>
                  <div className="text-md font-bold text-gray-900 ">1,920,000원</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {md && (
          <div className="relative md:w-1/2 md:px-5">
            <div
              className="fixed md:px-3"
              style={{
                width: fixedElementWidth,
              }}
              ref={rightColumn}
            >
              <div className="relative overflow-hidden rounded-lg">
                <iframe
                  src="https://m.cafe.naver.com/joonggonara/1000977523"
                  className="h-[720px] w-full"
                />

                {!isCoverRemoved && (
                  <div
                    onClick={onClickIframeCover}
                    className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black text-white opacity-80"
                  >
                    <div className="mb-3">
                      <FontAwesomeIcon icon={faHandPointUp} className="text-4xl" />
                    </div>
                    스크롤해서 정보를 확인할 수 있어요
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
