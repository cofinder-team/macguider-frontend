import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useRef, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import Image from '@/components/Image'
import Skeleton from 'react-loading-skeleton'
import { getPrices } from 'utils/price'
import { useRouter } from 'next/router'
import { useScreenSize } from 'hooks/useScreenSize'
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getDeal, getDeals } from 'utils/deals'
import optionsMac from '@/data/options/mac'
import optionsIpad from '@/data/options/ipad'
import { pastTime } from '@/lib/utils/pastTime'
import Banner from '@/components/Banner'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery, useQueries } from 'react-query'
import DealCard from '@/components/deals/DealCard'
import Link from '@/components/Link'

const rightColumnOffsetY = 112
const numberOfSampleDevices = 6

const getPriceInfo = async (deal) => {
  if (!deal) return

  const { item, unused } = deal
  const itemId = item.model.id
  const optionId = item.option
  const priceInfo = await getPrices(itemId, optionId, unused)
  return priceInfo
}

const sampleDevices = optionsMac
  .sort(() => Math.random() - Math.random())
  .slice(0, 3)
  .concat(optionsIpad.slice(0, numberOfSampleDevices - 3))

export default function Deal({ dealId }) {
  const router = useRouter()
  const { sm, md, lg } = useScreenSize()
  const [isCoverRemoved, setIsCoverRemoved] = useState(false)
  const [fixedElementWidth, setFixedElementWidth] = useState(0)
  const rightColumn = useRef(null)
  const container = useRef(null)

  const {
    isLoading: loadingDeal,
    error: errorDeal,
    data: deal,
  } = useQuery(['deal', dealId], () => getDeal(dealId), {
    refetchOnWindowFocus: false,
  })

  const {
    isLoading: loadingDeals,
    error: errorDeals,
    data: deals,
  } = useQuery(
    ['deal', 'other_deals', dealId, deal],
    () => getDeals(1, 4, 'date', 'desc', deal?.item.type, deal?.item.model.id),
    {
      enabled: deal && Object.keys(deal).length > 0,
      refetchOnWindowFocus: false,
    }
  )

  const {
    isLoading: loadingPriceInfo,
    error: errorPriceInfo,
    data: priceInfo,
  } = useQuery(['deal', 'price_info', dealId, deal], () => getPriceInfo(deal), {
    enabled: deal && Object.keys(deal).length > 0,
    refetchOnWindowFocus: false,
  })

  const queryResults = useQueries(
    sampleDevices.map((device) => ({
      queryKey: ['deal', 'other_price_info', device.id],
      queryFn: () => getPrices(device.id, device.data[0].options[0].id, false),
      refetchOnWindowFocus: false,
    }))
  )

  const errorPriceInfos = queryResults.some((result) => result.isError)
  const priceInfos = queryResults.map((result) => result.data)

  // Fetch 실패시
  if (errorDeal) {
    router.push('/deals')
  } else if (errorDeals || errorPriceInfo || errorPriceInfos) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  // 전체 로딩
  const loading = loadingDeal || loadingDeals || loadingPriceInfo

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
    amplitudeTrack('enter_page_deal_detail', {
      dealId,
    })
  }, [dealId])

  const parseUrl = useCallback(() => {
    if (!deal) return

    const { url } = deal

    return url.replace('https://cafe.naver.com', 'https://m.cafe.naver.com')
  }, [deal])

  const onClickPriceDetails = useCallback(() => {
    if (!priceInfo || !deal) return

    const { url, item, unused } = deal
    const itemId = item.model.id
    const optionId = item.option

    amplitudeTrack('click_price_details', {
      dealId,
    })

    const { href } =
      item.type === 'M'
        ? optionsMac.find((option) => option.id == itemId)
        : optionsIpad.find((option) => option.id == itemId)

    const convertedUrl = href.replace(/optionId=\d+/, `optionId=${optionId}`)
    window.open(convertedUrl, '_blank')
  }, [priceInfo, dealId, deal])

  const onClickIframeCover = useCallback(() => {
    setIsCoverRemoved(true)
    amplitudeTrack('click_iframe_cover', {
      dealId,
    })
  }, [dealId])

  const onClickOtherPriceDetails = useCallback((item) => {
    amplitudeTrack('click_other_price_details', {
      itemId: item.id,
    })

    window.open(item.href, '_blank')
  }, [])

  const onClickOtherDeal = useCallback(
    (dealId) => {
      router.push(`/deals/${dealId}`)
      amplitudeTrack('click_other_deal', {
        dealId,
      })
    },
    [router]
  )

  const onClickRedirectToSource = useCallback(() => {
    if (!deal) return

    const { url, source } = deal

    amplitudeTrack('click_redirect_to_source', {
      dealId,
      source,
    })
    window.open(url, '_blank')
  }, [dealId, deal])

  const getCoupangPrice = useCallback(() => {
    if (!priceInfo) return

    const { coupang: coupangPrices } = priceInfo
    const coupangPrice = coupangPrices.slice(-1)[0]?.price

    return coupangPrice
  }, [priceInfo])

  const getCoupangLastUpdatedTime = useCallback(() => {
    if (!priceInfo) return

    const { time: coupangLastUpdated } = priceInfo

    const coupangLastUpdatedTime = coupangLastUpdated

    if (coupangLastUpdatedTime) {
      const now = new Date()
      const lastUpdated = new Date(coupangLastUpdatedTime)
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
  }, [priceInfo])

  return (
    <>
      <PageSEO title={`중고 핫딜`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <div ref={container} className="container md:flex">
        <div className="md:w-1/2 md:px-5">
          <div className="space-y-1 text-xl font-bold md:mt-0">
            {loading || !deal ? (
              <Skeleton count={4} width="300px" />
            ) : (
              <>
                <p className="text-base font-semibold text-gray-500">
                  {deal.item.type === 'M' ? (
                    <>
                      {`${deal.item.model.name} ${deal.item.details.chip}`}
                      <br />
                      {`CPU ${deal.item.details.cpu}코어, GPU ${deal.item.details.gpu}코어, RAM ${deal.item.details.ram}GB, SSD ${deal.item.details.ssd}`}
                    </>
                  ) : (
                    <>
                      {`${deal.item.model.name} ${deal.item.details.gen}세대`}
                      <br />
                      {`${deal.item.details.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'}, ${
                        deal.item.details.storage
                      }`}
                    </>
                  )}
                </p>

                <div className="flex items-center" onClick={onClickPriceDetails}>
                  <div className="flex cursor-pointer  items-center border-b-2 border-black hover:bg-gray-200">
                    <span>중고 시세</span>
                    <ArrowUpRightIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-1">보다</div>
                </div>

                <div>
                  <span className="text-blue-500 ">
                    {(deal.average - deal.price).toLocaleString()}원
                  </span>
                  &nbsp;더 저렴해요
                </div>
              </>
            )}
          </div>

          <div className="mt-3">
            <h3 className=" text-lg font-bold">시세 정보</h3>

            <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li className="pb-3 sm:pb-4">
                {loading || !deal ? (
                  <Skeleton height="2rem" />
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">중고나라</p>
                      <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                        {deal.average ? `${deal.average.toLocaleString()}원` : 'N/A'}
                        <span className="ml-2 inline-block text-sm font-normal text-gray-400">
                          {pastTime()}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-blue-600 px-3 py-2 text-center text-sm font-bold text-white hover:bg-blue-800  focus:outline-none focus:ring-4 focus:ring-blue-300 xl:px-5"
                      onClick={onClickPriceDetails}
                    >
                      더 알아보기
                    </button>
                  </div>
                )}
              </li>
              <li className="pt-3 pb-0 sm:pt-4">
                {loading || !priceInfo ? (
                  <Skeleton height="2rem" />
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">쿠팡</p>
                      <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                        {getCoupangPrice() ? `${getCoupangPrice().toLocaleString()}원` : '품절'}
                        <span className="ml-2 inline-block text-sm font-normal text-gray-400">
                          {getCoupangLastUpdatedTime()}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="mt-5 md:hidden">
            {loading || !deal ? (
              <Skeleton height="1.5rem" />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold">제품 상세 정보</h3>
                  <div className="ml-2 flex items-center">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {deal.source}
                    </span>

                    <span className="ml-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {deal.unused ? '미개봉' : 'S급'}
                    </span>
                  </div>
                </div>

                <span
                  className="cursor-pointer text-sm underline"
                  onClick={onClickRedirectToSource}
                >
                  {deal.source}에서 보기
                </span>
              </div>
            )}

            {loadingDeals ? (
              <Skeleton height={500} />
            ) : (
              <div className="relative mt-1 overflow-hidden rounded-lg border-2 border-gray-400">
                <iframe src={parseUrl()} className="h-[500px] w-full" />

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
            )}
          </div>

          <div className="mt-5 md:mt-24">
            <h3 className="text-lg font-bold">다른 중고 꿀매물</h3>

            <div className="mt-1 space-y-1">
              {loading || !deals
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex h-[120px] items-center" key={index}>
                      <div className="mr-2 flex-1">
                        <h3>
                          <Skeleton />
                        </h3>
                        <p className="mb-0">
                          <Skeleton count={2} />
                        </p>
                      </div>
                      <div className="aspect-1 w-1/4 max-w-[100px] ">
                        <Skeleton height="100%" />
                      </div>
                    </div>
                  ))
                : deals
                    .filter((deal) => deal.id !== Number(dealId))
                    .sort(() => Math.random() - Math.random())
                    .slice(0, 3)
                    .map((deal) => (
                      <DealCard
                        deal={deal}
                        key={deal.id}
                        clickHandler={() => onClickOtherDeal(deal.id)}
                      />
                    ))}
            </div>
          </div>

          <div className="mt-5">
            <h3 className=" text-lg font-bold">적정 중고시세를 알려드려요</h3>
            <div className="mt-1 space-y-2">
              {sampleDevices.map((device, index) => (
                <div
                  key={device.id}
                  className="flex h-[110px] w-full cursor-pointer items-center overflow-hidden  bg-white "
                  onClick={() => {
                    onClickOtherPriceDetails(device)
                  }}
                >
                  <div className="relative h-full w-1/3">
                    <img
                      alt={device.model}
                      src={device.imgSrc}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <div className="flex-1 truncate pl-3">
                    <h5 className="mt-1 truncate  text-sm  font-semibold tracking-tight text-gray-600 ">
                      {device.model}
                    </h5>

                    {priceInfos.filter((data) => data).length !== numberOfSampleDevices ? (
                      <Skeleton containerClassName="flex-1" borderRadius="0.5rem" width="120px" />
                    ) : (
                      <div className="font-bold text-gray-900">
                        {priceInfos[index].data.slice(-1)[0].mid.toLocaleString()}원 부터
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
              {loading || !deal ? (
                <div className="mb-2">
                  <Skeleton height="2rem" />
                </div>
              ) : (
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold">제품 상세 정보</h3>
                    <div className="ml-2 flex items-center">
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {deal.source}
                      </span>

                      <span className="ml-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {deal.unused ? '미개봉' : 'S급'}
                      </span>
                    </div>
                  </div>

                  <span
                    className="cursor-pointer text-sm underline"
                    onClick={onClickRedirectToSource}
                  >
                    {deal.source}에서 보기
                  </span>
                </div>
              )}

              {loading || !deal ? (
                <div className="mb-2">
                  <Skeleton height="720px" />
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg border-2 border-gray-400">
                  <iframe src={parseUrl()} className="h-[720px] w-full" />

                  {!isCoverRemoved && (
                    <>
                      {deal.source === '중고나라' ? (
                        <div
                          onClick={onClickIframeCover}
                          className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black text-white opacity-80"
                        >
                          <div className="mb-3">
                            <FontAwesomeIcon icon={faHandPointUp} className="text-4xl" />
                          </div>
                          스크롤해서 정보를 확인할 수 있어요
                        </div>
                      ) : (
                        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-black text-white opacity-90">
                          <div className="mb-3">
                            <FontAwesomeIcon icon={faXmark} className="text-4xl" />
                          </div>
                          <span className="mb-1 text-sm">PC에서는 iframe을 지원하지 않습니다.</span>

                          <Link href={parseUrl()} className="underline">
                            {deal.source}에서 확인하기
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Banner />
    </>
  )
}

export async function getServerSideProps(context) {
  const { dealId } = context.query

  return {
    props: {
      dealId,
    },
  }
}
