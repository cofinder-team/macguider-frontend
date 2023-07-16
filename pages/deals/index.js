import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '@/components/Image'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { getDeals } from 'utils/deals'
import { axiosInstanceV2 } from '@/lib/axios'
import optionsMac from '@/data/options/mac'
import optionsIpad from '@/data/options/ipad'

const categories = ['10% 이상 저렴', '5% 이상 저렴']

export default function Deals({ deals }) {
  const [currentCategory, setCurrentCategory] = useState('10% 이상 저렴')
  const router = useRouter()

  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  const onClickDealCard = useCallback(
    (dealId) => {
      router.push(`/deals/${dealId}`)
    },
    [router]
  )

  const onClickCategory = useCallback((category) => {
    setCurrentCategory(category)
  }, [])

  return (
    <>
      <PageSEO title={`중고 꿀매 찾기`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />

      <h1 className="text-2xl font-bold">MacGuider 보물찾기</h1>
      <p className="mt-1 text-base font-semibold text-gray-500">
        <span className="text-blue-600">매일 오전 11시</span> 중고로 판매 중인 제품 중 <br />
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
        {deals.map(
          ({ id, source, price, sold, unopened, url, itemId, type: itemType, model, avgPrice }) => (
            <div
              onClick={() => {
                onClickDealCard(id)
              }}
              className="flex h-[130px] w-full cursor-pointer items-center overflow-hidden  bg-white"
              key={id}
            >
              <div className="flex-1 truncate">
                <div className="items-center space-x-1  selection:flex">
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {source}
                  </span>

                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {unopened ? '미개봉' : 'S급'}
                  </span>
                </div>

                <h5 className="mt-1 truncate  text-sm font-semibold tracking-tight text-gray-900">
                  {model.type === 'M'
                    ? `${model.name} ${model.chip} (${model.cpu}코어 GPU ${model.gpu}코어, SSD ${model.ssd})`
                    : `${model.name} ${model.chip} SSD ${model.ssd}`}
                </h5>

                <div className=" flex items-center text-lg">
                  <div className="font-bold text-gray-900">{price.toLocaleString()}원</div>
                </div>
                <div className="text-xs  text-gray-500">
                  <span>평균 중고가&nbsp;</span>
                  {avgPrice.toLocaleString()}원
                </div>
              </div>

              <div className="flex h-full w-1/5 max-w-[100px] items-center">
                <div className="relative aspect-1 overflow-hidden rounded-md">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL_V2}/deal/${id}/image`}
                    alt="게시글 썸네일"
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

      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white">
            <a href="https://tally.so/r/mOlRPM">
              새로운 중고 꿀매물이 들어오면 알려드릴게요
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
      const avgPrice = await getAvgPrice(deal.itemId, deal.type, deal.unopened)

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
