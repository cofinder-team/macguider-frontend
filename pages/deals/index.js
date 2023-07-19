import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import Image from '@/components/Image'
import { useRouter } from 'next/router'
import { getDeals } from 'utils/deals'
import Banner from '@/components/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import useAsync from 'hooks/useAsync'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// const categories = ['10% 이상', '5% 이상']

export default function Deals() {
  const router = useRouter()
  // const [currentCategory, setCurrentCategory] = useState('10% 이상')
  // const [currentDeals, setCurrentDeals] = useState([])
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date())
  const [visibleLastUpdatedTime, setVisibleLastUpdatedTime] = useState()

  const [state, refetch] = useAsync(getDeals, [], [])
  const { loading, data: deals, error } = state

  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  // useEffect(() => {
  //   if (deals) {
  //     if (currentCategory === '10% 이상') {
  //       setCurrentDeals(deals.filter((deal) => deal.avgPrice && deal.avgPrice >= deal.price * 0.9))
  //     } else {
  //       setCurrentDeals(
  //         deals.filter(
  //           (deal) =>
  //             deal.avgPrice &&
  //             deal.avgPrice >= deal.price * 0.95 &&
  //             deal.avgPrice < deal.price * 0.9
  //         )
  //       )
  //     }
  //   }
  // }, [currentCategory, deals])

  useEffect(() => {
    setVisibleLastUpdatedTime('방금 전')

    const interval = setInterval(() => {
      // 1시간 이후 부터
      if (new Date() - lastUpdatedTime > 3600000) {
        setVisibleLastUpdatedTime('업데이트 필요')
      }
      // 1분 이후 부터
      else if (new Date() - lastUpdatedTime > 60000) {
        setVisibleLastUpdatedTime(`${Math.floor((new Date() - lastUpdatedTime) / 60000)}분 전`)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [lastUpdatedTime])

  const onClickDealCard = useCallback(
    (dealId) => {
      router.push(`/deals/${dealId}`)
      amplitudeTrack('click_deal_card', {
        dealId,
      })
    },
    [router]
  )

  // const onClickCategory = useCallback((category) => {
  //   setCurrentCategory(category)
  //   amplitudeTrack('click_change_category', {
  //     category,
  //   })
  // }, [])

  const onClickHandleReload = useCallback(async () => {
    amplitudeTrack('click_reload_deals')

    try {
      refetch()
      setLastUpdatedTime(new Date())
    } catch (error) {
      console.error('Error fetching deals:', error)
    }
  }, [refetch])

  const getDiscountPercentage = useCallback((price, avgPrice) => {
    return Math.round((1 - price / avgPrice) * 100)
  }, [])

  return (
    <>
      <PageSEO title={`중고 핫딜`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />
      <h1 className="text-2xl font-bold">중고 Apple 제품 보물찾기 &#128142;</h1>
      <p className="font-base text-sm text-gray-500">시세보다 저렴한 중고 애플 제품을 모아왔어요</p>
      <div className="sticky top-[88px] z-10 mt-4 text-sm font-medium md:static  md:top-auto">
        {/* <div className="flex items-center justify-between">
          <ul className="-mb-px flex flex-wrap text-center">
            {categories.map((category) => (
              <li
                className="mr-2 cursor-pointer"
                key={category}
                onClick={() => {
                  onClickCategory(category)
                }}
              >
                <span
                  className={`inline-block rounded-t-lg border-b-2 border-transparent p-2 text-base 
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
          <div className="flex cursor-pointer items-center" onClick={onClickHandleReload}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="inlin-block ml-1">{visibleLastUpdatedTime}</span>
          </div>
        </div> */}

        <div className="-mx-4 flex items-center justify-between bg-gray-100 p-4 text-gray-600">
          <div>
            평균 중고 시세보다&nbsp;
            {/* <span className="font-bold text-gray-700">{currentCategory}&nbsp;</span> */}
            저렴한 제품들이에요
          </div>

          <div className="flex cursor-pointer items-center " onClick={onClickHandleReload}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="inlin-block ml-1">{visibleLastUpdatedTime}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 xl:grid-cols-2 xl:gap-x-16 xl:gap-y-4">
        {loading || !deals
          ? Array.from({ length: 6 }).map((_, index) => (
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
          : deals.map(
              ({
                id,
                source,
                price,
                sold,
                unused,
                url,
                itemId,
                type: itemType,
                model,
                avgPrice,
              }) => (
                <div
                  onClick={() => {
                    onClickDealCard(id)
                  }}
                  className="flex h-[120px] w-full cursor-pointer items-center overflow-hidden  bg-white"
                  key={id}
                >
                  <div className="mr-2 flex-1 truncate">
                    <div className="mt-1 truncate  text-base  font-medium tracking-tight text-gray-600">
                      <span className="mr-1 inline-block font-semibold">
                        {unused ? (
                          <span className="text-blue-500">미개봉</span>
                        ) : (
                          <span className="text-green-500">S급</span>
                        )}
                      </span>
                      {itemType === 'M'
                        ? `${model.name} ${model.chip}`
                        : `${model.name} ${model.gen}세대`}
                    </div>
                    <div className="text-xs font-normal text-gray-500">
                      <span className="mr-1 inline-block  text-gray-600">{source}</span>
                      {itemType === 'M'
                        ? `${model.cpu}코어 GPU ${model.gpu}코어, SSD ${model.ssd}`
                        : `${model.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'} (${model.storage})`}
                    </div>

                    <div className=" flex items-center text-lg">
                      <div className="font-bold text-gray-900">{price?.toLocaleString()}원</div>
                    </div>

                    {avgPrice && (
                      <div className="text-xs  text-gray-500">
                        <span className="font-semibold text-blue-500">
                          {getDiscountPercentage(price, avgPrice)}%&nbsp;
                        </span>
                        <span>평균&nbsp;</span>
                        {avgPrice?.toLocaleString()}원
                      </div>
                    )}
                  </div>

                  <div className="flex h-full w-1/4 max-w-[100px] items-center">
                    <div className="relative aspect-1 overflow-hidden rounded-md">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL_V2}/deal/${id}/image`}
                        alt={`${model.name} 썸네일`}
                        className="h-full w-full object-cover object-center"
                      />

                      {sold && (
                        <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-sm font-bold text-white ">
                          <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                            판매완료
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
      </div>

      <Banner />
    </>
  )
}
