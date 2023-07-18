import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import Image from '@/components/Image'
import { useRouter } from 'next/router'
import { getDeals } from 'utils/deals'
import { axiosInstanceV2 } from '@/lib/axios'
import optionsMac from '@/data/options/mac'
import optionsIpad from '@/data/options/ipad'
import Banner from '@/components/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

const categories = ['10% 이상', '5% 이상']

export default function Deals({ deals: initialDeals }) {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState('10% 이상')
  const [entireDeals, setEntireDeals] = useState(initialDeals)
  const [currentDeals, setCurrentDeals] = useState(entireDeals)
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date())
  const [visibleLastUpdatedTime, setVisibleLastUpdatedTime] = useState()

  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  useEffect(() => {
    if (currentCategory === '10% 이상') {
      setCurrentDeals(
        entireDeals.filter((deal) => deal.avgPrice && deal.avgPrice >= deal.price * 0.9)
      )
    } else {
      setCurrentDeals(
        entireDeals.filter(
          (deal) =>
            deal.avgPrice && deal.avgPrice >= deal.price * 0.95 && deal.avgPrice < deal.price * 0.9
        )
      )
    }
  }, [currentCategory, entireDeals])

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

  const onClickCategory = useCallback((category) => {
    setCurrentCategory(category)
    amplitudeTrack('click_change_category', {
      category,
    })
  }, [])

  const onClickHandleReload = useCallback(async () => {
    amplitudeTrack('click_reload_deals')

    try {
      const newDeals = await getDeals()
      setEntireDeals(newDeals)
      setLastUpdatedTime(new Date())
    } catch (error) {
      console.error('Error fetching deals:', error)
    }
  }, [])

  const getDiscountPercentage = useCallback((price, avgPrice) => {
    return Math.round((1 - price / avgPrice) * 100)
  }, [])

  return (
    <>
      <PageSEO title={`중고 꿀매 찾기`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <h1 className="text-2xl font-bold">중고 Apple 제품 보물찾기 &#128142;</h1>
      <p className="font-base text-sm text-gray-500">시세보다 저렴한 중고 애플 제품을 모아왔어요</p>

      <div className="mt-4 text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <div className="flex items-center justify-between">
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
          <div className="flex items-center" onClick={onClickHandleReload}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="inlin-block ml-1">{visibleLastUpdatedTime}</span>
          </div>
        </div>

        <div className="-mx-4 bg-gray-100 p-4">
          평균 중고 시세보다&nbsp;
          <span className="font-bold text-gray-700">{currentCategory}&nbsp;</span>
          저렴한 제품들이에요
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        {currentDeals.map(
          ({ id, source, price, sold, unused, url, itemId, type: itemType, model, avgPrice }) => (
            <div
              onClick={() => {
                onClickDealCard(id)
              }}
              className="flex h-[120px] w-full cursor-pointer items-center overflow-hidden  bg-white"
              key={id}
            >
              <div className="flex-1 truncate">
                <div className="items-center space-x-1  selection:flex">
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {source}
                  </span>

                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {unused ? '미개봉' : 'S급'}
                  </span>
                </div>

                <h5 className="mt-1 truncate  text-sm font-semibold tracking-tight text-gray-900">
                  {itemType === 'M'
                    ? `${model.name} ${model.chip} (${model.cpu}코어 GPU ${model.gpu}코어, SSD ${model.ssd})`
                    : `${model.name} ${model.gen}세대 ${
                        model.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'
                      } (${model.storage})`}
                </h5>

                <div className=" flex items-center text-lg">
                  <div className="font-bold text-gray-900">{price?.toLocaleString()}원</div>
                </div>

                {avgPrice && (
                  <div className="text-xs  text-gray-500">
                    <span className="font-semibold text-blue-500">
                      {getDiscountPercentage(price, avgPrice)}%&nbsp;
                    </span>
                    <span>평균 중고가&nbsp;</span>
                    {avgPrice?.toLocaleString()}원
                  </div>
                )}
              </div>

              <div className="flex h-full w-1/5 max-w-[100px] items-center">
                <div className="relative aspect-1 overflow-hidden rounded-md">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL_V2}/deal/${id}/image`}
                    alt={`${model.name} 썸네일`}
                    className="h-full w-full object-contain object-center"
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

export async function getServerSideProps() {
  let deals = await getDeals()

  const getModel = async (newItemId, itemType) => {
    const res = await axiosInstanceV2.get(`/item/${itemType}/${newItemId}`)
    const { model: itemId, option: optionId, type, details } = res.data
    let target

    if (type === 'M') {
      // 맥일 경우
      target = optionsMac
    } else {
      // 아이패드일 경우
      target = optionsIpad
    }

    const name = target.find((device) => device.id == itemId).model
    return {
      ...details,
      name,
      type,
    }
  }

  const getAvgPrice = async (newItemId, itemType, unused) => {
    const res = await axiosInstanceV2.get(`/price/deal/${itemType}/${newItemId}`, {
      params: {
        unused,
      },
    })

    const avgPrice = res.data.average

    return avgPrice
  }

  deals = await Promise.all(
    deals.map(async (deal) => {
      const model = await getModel(deal.itemId, deal.type)
      const avgPrice = await getAvgPrice(deal.itemId, deal.type, deal.unused)

      return {
        ...deal,
        model,
        avgPrice,
      }
    })
  )

  return {
    props: {
      deals,
    },
  }
}
