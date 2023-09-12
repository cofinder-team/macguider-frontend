import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import { getRecentTradePrice } from 'utils/price'
import { useRouter } from 'next/router'
import { useScreenSize } from 'hooks/useScreenSize'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { getDeal, getDeals } from 'utils/deals'
import { pastTime } from '@/lib/utils/pastTime'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery, useQueries } from 'react-query'
import DealCard from '@/components/deals/DealCard'
import Link from '@/components/Link'
import { getModels } from 'utils/model'

const rightColumnOffsetY = 112
const numberOfSampleDevices = 6

export default function Deal({ dealId }) {
  const router = useRouter()
  const { sm, md, lg } = useScreenSize()
  const [isCoverRemoved, setIsCoverRemoved] = useState(false)
  const [fixedElementWidth, setFixedElementWidth] = useState(0)
  const rightColumn = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    amplitudeTrack('enter_page_deal_detail', {
      dealId,
    })
  }, [dealId])

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768

      if (!isMobile && container.current && rightColumn.current) {
        const st = window.scrollY || document.documentElement.scrollTop

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
        const parentElement = rightColumn.current.parentElement as HTMLDivElement

        if (!parentElement) return

        const parentWidth = parentElement.offsetWidth

        if (isMobile) {
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

  const {
    isLoading: loadingModels,
    error: errorModels,
    data: models = [],
  } = useQuery(['models'], () => getModels())

  const {
    isLoading: loadingDeal,
    error: errorDeal,
    data: deal,
  } = useQuery(['deal', dealId], () => getDeal(dealId), {
    staleTime: 30000,
  })

  const {
    isLoading: loadingDeals,
    error: errorDeals,
    data: deals,
  } = useQuery(
    ['deal', 'other_deals', dealId, deal],
    () => getDeals(1, 4, 'date', 'desc', deal?.item.type, deal?.item.model.id),
    {
      enabled: !!deal,
      staleTime: 30000,
    }
  )

  const sampleModels = useMemo(() => {
    if (!models) return []

    return models.slice(0, 6)
  }, [models])

  const queryResults = useQueries(
    sampleModels.map((model) => ({
      queryKey: ['deal', 'other_price_info', model.id],
      queryFn: () => getRecentTradePrice(model.type, model.mainItem.id),
      staleTime: 30000,
    }))
  )

  const errorPriceInfos = queryResults.some((result) => result.isError)
  const priceInfos = queryResults.map((result) => result.data)

  // Fetch 실패시
  if (errorDeal) {
    router.push('/deals')
  } else if (errorDeals || errorPriceInfos) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  // 전체 로딩
  const loading = loadingDeal || loadingDeals

  const parseUrl = useCallback(() => {
    if (!deal) return

    const { url } = deal

    return url.replace('https://cafe.naver.com', 'https://m.cafe.naver.com')
  }, [deal])

  const generateModelHref = useCallback((type: ModelType, id: number) => {
    switch (type) {
      case 'M':
        return `/prices/mac/${id}`
      case 'P':
        return `/prices/ipad/${id}`
      case 'I':
        return `/prices/iphone/${id}`
    }
  }, [])

  const onClickPriceDetails = useCallback(() => {
    if (!deal) return

    amplitudeTrack('click_price_details', {
      dealId,
    })

    const url = generateModelHref(deal.item.type, deal.item.id)

    window.open(url, '_blank')
  }, [dealId, deal, generateModelHref])

  const onClickOtherPriceDetails = useCallback(
    (item: MainItemResponse) => {
      amplitudeTrack('click_other_price_details', {
        itemId: item.id,
      })

      window.open(generateModelHref(item.mainItem.type, item.mainItem.id), '_blank')
    },
    [generateModelHref]
  )

  const onClickIframeCover = useCallback(() => {
    if (!deal) return

    amplitudeTrack('click_iframe_cover', {
      dealId,
    })

    if (deal.source === '번개장터') return
    setIsCoverRemoved(true)
  }, [deal, dealId])

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

  const coupangLastUpdatedTime = useMemo(() => {
    if (!deal) return

    const coupangLastUpdatedTime = deal.coupangPrice.date

    if (coupangLastUpdatedTime) {
      const now = new Date()
      const lastUpdated = new Date(coupangLastUpdatedTime)
      const diffTime = Math.abs(now.getTime() - lastUpdated.getTime())
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
  }, [deal])

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
                      {`${deal.item.model.name} ${(deal.item as MacItemResponse).details.chip}`}
                      <br />
                      {`CPU ${(deal.item as MacItemResponse).details.cpu}코어, GPU ${
                        (deal.item as MacItemResponse).details.gpu
                      }코어, RAM ${(deal.item as MacItemResponse).details.ram}GB, SSD ${
                        (deal.item as MacItemResponse).details.ssd
                      }`}
                    </>
                  ) : deal.item.type === 'P' ? (
                    <>
                      {`${(deal.item as IpadItemResponse).model.name} ${
                        (deal.item as IpadItemResponse).details.gen
                      }세대`}
                      <br />
                      {`${
                        (deal.item as IpadItemResponse).details.cellular
                          ? 'Wi-Fi + Cellular'
                          : 'Wi-Fi'
                      }, ${(deal.item as IpadItemResponse).details.storage}`}
                    </>
                  ) : (
                    <>
                      {`${(deal.item as IphoneItemResponse).model.name} ${
                        (deal.item as IphoneItemResponse).details.modelSuffix
                      }`}
                      <br />
                      {`${(deal.item as IphoneItemResponse).details.storage}`}
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
                    {deal.tradePrice.average
                      ? `${(deal.tradePrice.average - deal.price).toLocaleString()}`
                      : 'N/A'}
                  </span>
                  원&nbsp;더 저렴해요
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
                        {deal.tradePrice.average
                          ? `${deal.tradePrice.average.toLocaleString()}원`
                          : 'N/A'}
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
                {loading || !deal ? (
                  <Skeleton height="2rem" />
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">쿠팡</p>
                      <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                        {deal.coupangPrice.price
                          ? `${deal.coupangPrice.price.toLocaleString()}원`
                          : '품절'}
                        <span className="ml-2 inline-block text-sm font-normal text-gray-400">
                          {coupangLastUpdatedTime}
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

            {!deal ? (
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
                      {deal.source === '번개장터' ? (
                        <FontAwesomeIcon icon={faXmark} className="text-4xl" />
                      ) : (
                        <FontAwesomeIcon icon={faHandPointUp} className="text-4xl" />
                      )}
                    </div>
                    {deal.source === '번개장터'
                      ? '번개장터에서 확인해주세요'
                      : '스크롤해서 정보를 확인할 수 있어요'}
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
              {sampleModels.map((model, index) => (
                <div
                  key={model.id}
                  className="flex h-[110px] w-full cursor-pointer items-center overflow-hidden  bg-white "
                  onClick={() => {
                    onClickOtherPriceDetails(model)
                  }}
                >
                  <div className="relative h-full w-1/3">
                    <img
                      alt={model.name}
                      src={model.mainItem.image.url}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <div className="flex-1 truncate pl-3">
                    <h5 className="mt-1 truncate  text-sm  font-semibold tracking-tight text-gray-600 ">
                      {model.name}
                    </h5>

                    {priceInfos.filter((data) => data).length !== numberOfSampleDevices ? (
                      <Skeleton containerClassName="flex-1" borderRadius="0.5rem" width="120px" />
                    ) : (
                      <div className="font-bold text-gray-900">
                        {priceInfos[index]?.average
                          ? `${priceInfos[index]?.average?.toLocaleString()}원 부터`
                          : 'N/A'}
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
