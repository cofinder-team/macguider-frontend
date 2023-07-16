import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useRef, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import Image from '@/components/Image'
import Skeleton from 'react-loading-skeleton'
import useAsync from 'hooks/useAsync'
import { getPrices } from 'utils/price'
import { useRouter } from 'next/router'
import { useScreenSize } from 'hooks/useScreenSize'
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getDeals } from 'utils/deals'

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
    amplitudeTrack('enter_page_deals_detail')
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
      <PageSEO title={`중고 꿀매 찾기`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <div ref={container} className="container md:flex">
        <div className="md:w-1/2 md:px-5">
          <div className="space-y-1 text-xl font-bold md:mt-0">
            <p className="text-base font-semibold text-gray-500">MacBook Pro 13 - 2020</p>
            <div className="flex items-center ">
              <div
                className="flex cursor-pointer  items-center border-b-2 border-black hover:bg-gray-200"
                onClick={() => {
                  router.push('/prices/mac/macbook-pro-13')
                }}
              >
                <span>중고 시세</span>
                <ArrowUpRightIcon className="h-6 w-6" />
              </div>
              <div className="ml-1">보다</div>
            </div>

            <div>
              <span className="text-blue-500 ">120,000원</span>
              &nbsp;더 저렴해요
            </div>
          </div>

          <div className="mt-3">
            <h3 className=" text-lg font-bold">시세 정보</h3>

            <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">중고나라</p>
                    <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                      1,920,000원
                      <span className="ml-2 inline-block text-sm font-normal text-gray-400">
                        12일 전
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-blue-600 px-3 py-2 text-center text-sm font-bold text-white hover:bg-blue-800  focus:outline-none focus:ring-4 focus:ring-blue-300 xl:px-5"
                  >
                    더 알아보기
                  </button>
                </div>
              </li>
              <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">쿠팡</p>
                    <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                      1,920,000원
                      <span className="ml-2 inline-block text-sm font-normal text-gray-400">
                        12일 전
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-5 md:hidden">
            <div className="flex items-center">
              <h3 className=" text-lg font-bold">제품 상세 정보</h3>
              <div className="ml-2 flex items-center">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  중고나라
                </span>

                <span className="ml-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  S급
                </span>
              </div>
            </div>

            <div className="relative mt-1 overflow-hidden rounded-lg border-2 border-gray-400">
              <iframe
                src="https://m.cafe.naver.com/joonggonara/1001412562"
                className="h-[500px] w-full"
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

          <div className="mt-5 md:mt-24">
            <h3 className=" text-lg font-bold">다른 중고 꿀매물</h3>

            <div className="space-y-3">
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
                      src={
                        'https://static.waveon.io/img/apps/18146/KakaoTalk_20230712_085626802.jpg'
                      }
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
                      src={
                        'https://static.waveon.io/img/apps/18146/KakaoTalk_20230712_085626802.jpg'
                      }
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
                      src={
                        'https://static.waveon.io/img/apps/18146/KakaoTalk_20230712_085626802.jpg'
                      }
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
          </div>

          <div className="mt-5">
            <h3 className=" text-lg font-bold">적정 중고시세를 알려드려요</h3>

            <div className="space-y-3">
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
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
                  <h5 className="mt-1 truncate  text-sm  font-semibold tracking-tight text-gray-600 ">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className=" flex items-center text-lg">
                    <div className="font-bold text-gray-900">1,920,000원 부터</div>
                  </div>
                </div>
              </div>
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
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
                  <h5 className="mt-1 truncate  text-sm  font-semibold tracking-tight text-gray-600 ">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className=" flex items-center text-lg">
                    <div className="font-bold text-gray-900">1,920,000원 부터</div>
                  </div>
                </div>
              </div>
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
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
                  <h5 className="mt-1 truncate  text-sm  font-semibold tracking-tight text-gray-600 ">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className=" flex items-center text-lg">
                    <div className="font-bold text-gray-900">1,920,000원 부터</div>
                  </div>
                </div>
              </div>
              <div className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white">
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
                  <h5 className="mt-1 truncate  text-sm  font-semibold tracking-tight text-gray-600 ">
                    MacBook Pro 13-inch M1 2020
                  </h5>

                  <div className=" flex items-center text-lg">
                    <div className="font-bold text-gray-900">1,920,000원 부터</div>
                  </div>
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
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-400">
                <iframe
                  src="https://m.cafe.naver.com/joonggonara/1001412562"
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

export async function getServerSideProps(context) {
  const { dealId } = context.query

  const deals = await getDeals()
  const deal = deals.find((deal) => deal.id === Number(dealId))

  if (deal) {
    const { type, itemId, price, sold, unopened, source, url } = deal
  }

  // const getModel = async (newItemId, itemType) => {
  //   const res = await axiosInstanceV2.get(`/item/${itemType}/${newItemId}`)
  //   const { model: itemId, option: optionId, type, details } = res.data
  //   let target

  //   if (type === 'M') {
  //     // 맥일 경우
  //     target = optionsMac
  //   } else {
  //     // 아이패드일 경우
  //     target = optionsIpad
  //   }

  //   const name = target.find((device) => device.id == itemId).model
  //   return {
  //     ...details,
  //     name,
  //     type,
  //   }
  // }

  // const getAvgPrice = async (newItemId, itemType, unused) => {
  //   const res = await axiosInstanceV2.get(`/price/deal/${itemType}/${newItemId}`, {
  //     params: {
  //       unused,
  //     },
  //   })

  //   const avgPrice = res.data.average

  //   return avgPrice
  // }

  // deals = await Promise.all(
  //   deals.map(async (deal) => {
  //     const model = await getModel(deal.itemId, deal.type)
  //     const avgPrice = await getAvgPrice(deal.itemId, deal.type, deal.unopened)

  //     console.log(model)

  //     return {
  //       ...deal,
  //       model,
  //       avgPrice,
  //     }
  //   })
  // )

  return {
    props: {
      dealId,
    },
  }
}
