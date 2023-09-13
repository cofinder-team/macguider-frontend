import amplitudeTrack from '@/lib/amplitude/track'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScreenSize } from 'hooks/useScreenSize'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { getRecentTradePrice, getTotalRegularPrice } from 'utils/price'
import { purchaseTiming } from '../guide/GuideBriefRow'

interface Props {
  model: MainItemResponse
  item: ItemResponse
  unused: boolean
  source: Source
  setSource: (source: Source) => void
  setUnused: (unused: boolean) => void
}

const TradePrices = ({ model, item, unused, setUnused, source, setSource }: Props) => {
  const router = useRouter()
  const { md } = useScreenSize()

  // 전체 시세 조회
  const {
    isLoading: loadingRecentPrice,
    error: errorRecentPrice,
    data: recentPriceData,
  } = useQuery(['recentPrice', item.type, item.id, unused, source], () =>
    getRecentTradePrice(item.type, item.id, unused, source)
  )

  // 전체 정가 조회
  const {
    isLoading: loadingTotalRegularPrice,
    error: errorTotalRegularPrice,
    data: totalRegularPrice,
  } = useQuery(['totalRegularPrice', item.id], () => getTotalRegularPrice(item.type, item.id))

  // 가격 데이터 fetch 실패시 alert창 띄우기
  if (errorRecentPrice || errorTotalRegularPrice) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const recentRegularPrice = useMemo(() => {
    if (!totalRegularPrice) return null
    return totalRegularPrice.slice(-1)[0].price
  }, [totalRegularPrice])

  const getPriceByLevel = useCallback(
    (level: 'average' | 'price_20' | 'price_80') => {
      return recentPriceData?.[level] || null
    },
    [recentPriceData]
  )

  const onClickBuyersGuide = useCallback(() => {
    amplitudeTrack('click_route_buyers_guide', { type: item.type, id: item.id })
    router.push('/buyers-guide')
  }, [item.id, item.type, router])

  const onInputPlatform = useCallback(
    (platform: Source) => {
      amplitudeTrack('click_change_platform', {
        platform,
      })

      if (platform === '당근마켓') {
        alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')
        return
      }

      setSource(platform)
    },
    [setSource]
  )

  // 미개봉 상태 변경
  const onInputOptionUnused = useCallback(
    (status: boolean) => {
      setUnused(status)

      amplitudeTrack('click_change_unused', {
        type: item.type,
        id: item.id,
        status,
      })
    },
    [item.id, item.type, setUnused]
  )

  const lastTradePriceUpdated = useMemo(() => {
    const now = new Date()

    // Create a Date object for yesterday at 11 PM
    const yesterdayElevenPM = new Date()
    yesterdayElevenPM.setDate(now.getDate() - 1) // Go back one day
    yesterdayElevenPM.setHours(23, 0, 0, 0) // Set the time to 11:00:00 PM

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = now.getTime() - yesterdayElevenPM.getTime()

    // Convert the time difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}시간 전`
    }
    if (minutes > 0) {
      return `${minutes}분 전`
    }
    return '방금 전'
  }, [])

  const daysSinceLastReleaseDate = useMemo(() => {
    if (model.histories.length === 0) return

    const today = new Date()
    const [year, month, date] = model.histories[0].date.split('-')

    const daysSinceLastReleaseDate = Math.floor(
      (today.getTime() - new Date(Number(year), Number(month) - 1, Number(date)).getTime()) /
        (1000 * 60 * 60 * 24)
    )

    return daysSinceLastReleaseDate
  }, [model.histories])

  const averageReleaseCycle = useMemo(() => {
    const releaseCycles: number[] = []
    for (let i = 0; i < model.histories.length - 1; i++) {
      // convert YYYY-MM-DD string to Date object
      const prev = model.histories[i].date.split('-')
      const next = model.histories[i + 1].date.split('-')

      const date1 = new Date(Number(prev[0]), Number(prev[1]) - 1, Number(prev[2]))
      const date2 = new Date(Number(next[0]), Number(next[1]) - 1, Number(next[2]))
      const diffTime = Math.abs(date2.getTime() - date1.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      releaseCycles.push(diffDays)
    }

    const averageReleaseCycle = Math.round(
      releaseCycles.reduce((a, b) => a + b, 0) / releaseCycles.length
    )

    return averageReleaseCycle
  }, [model.histories])

  const usedPurchaseTiming = useMemo(() => {
    if (recentPriceData) {
      const latestUsedPrice = recentPriceData.average

      if (
        latestUsedPrice &&
        recentRegularPrice &&
        averageReleaseCycle &&
        daysSinceLastReleaseDate
      ) {
        const getPriceFitScore = () => (latestUsedPrice / recentRegularPrice) * 100
        const getReleaseDateFitScore = () =>
          (1 - daysSinceLastReleaseDate / averageReleaseCycle) * 100
        const overallFitScore = getPriceFitScore() * 0.6 + getReleaseDateFitScore() * 0.4

        if (overallFitScore >= 61) {
          return purchaseTiming.good
        } else if (overallFitScore >= 40) {
          return purchaseTiming.normal
        } else {
          return purchaseTiming.bad
        }
      }
    }
  }, [recentPriceData, recentRegularPrice, daysSinceLastReleaseDate, averageReleaseCycle])

  return (
    <div className="mt-5">
      <p className="text-md font-bold text-gray-900 dark:text-white">중고 시세</p>

      <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        <li className="pb-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                중고거래 플랫폼
              </p>
            </div>
            <div className="inline-flex w-1/3 items-center text-base font-semibold text-gray-900 dark:text-white">
              <select
                id="source"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onInput={(e: ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value as Source
                  onInputPlatform(value)
                }}
                value={source}
              >
                <option value="전체">전체</option>
                <option value="중고나라">중고나라</option>
                <option value="번개장터">번개장터</option>
                <option value="당근마켓">당근마켓</option>
              </select>
            </div>
          </div>
        </li>
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                제품 상태
              </p>
            </div>
            <div className="inline-flex w-1/3 items-center text-base font-semibold text-gray-900 dark:text-white">
              <select
                id="cpuOptions"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onInput={(e: ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value === 'true'
                  onInputOptionUnused(value)
                }}
                value={unused.toString()}
              >
                <option value="true">미개봉</option>
                <option value="false">S급</option>
              </select>
            </div>
          </div>
        </li>
        <li className="bg-gray-100 py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">적정가격</p>
            </div>
            <div className="pr-2 text-right text-base font-semibold text-gray-900">
              {loadingRecentPrice ? (
                <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
              ) : getPriceByLevel('average') ? (
                <>
                  <span>{getPriceByLevel('average')?.toLocaleString()}</span>
                  <span className="ml-1 font-normal">원</span>

                  <div className="truncate text-sm text-gray-500 dark:text-gray-400">
                    <div className="truncate text-xs">
                      <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                      <span className="truncate text-gray-600">{lastTradePriceUpdated}</span>
                    </div>
                  </div>
                </>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </li>

        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 truncate text-sm font-medium text-gray-900 dark:text-white">
                최저가격
              </p>
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">최고가격</p>
            </div>

            <div className="pr-2">
              <div className="mb-1 text-right text-sm font-medium text-gray-900 dark:text-white">
                {loadingRecentPrice ? (
                  <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                ) : getPriceByLevel('price_20') ? (
                  <>
                    <span>{getPriceByLevel('price_20')?.toLocaleString()}</span>
                    <span className="ml-1 font-normal">원</span>
                  </>
                ) : (
                  <span>N/A</span>
                )}
              </div>
              <div className="text-right text-sm font-medium text-gray-900 dark:text-white">
                {loadingRecentPrice ? (
                  <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                ) : getPriceByLevel('price_80') ? (
                  <>
                    <span>{getPriceByLevel('price_80')?.toLocaleString()}</span>
                    <span className="ml-1 font-normal">원</span>
                  </>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </div>
          </div>
        </li>
      </ul>

      {
        // 현재 애플스토어에 판매 중인 제품에 대해서만 가이드 표시

        loadingRecentPrice || loadingTotalRegularPrice ? (
          <Skeleton className="max-w-md" height="4rem" borderRadius="0.5rem" />
        ) : (
          <div
            onClick={onClickBuyersGuide}
            className="max-w-md cursor-pointer rounded bg-gray-100  py-3 sm:py-4"
          >
            <div className="flex items-center space-x-4 pr-2">
              <div className="flex-shrink-0"></div>
              <div className="min-w-0 flex-1 ">
                <p className="truncate text-sm font-semibold text-gray-900 ">구매시기 가이드</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  지금 중고로 사도 괜찮을까요?
                </p>
              </div>

              {usedPurchaseTiming && (
                <div
                  className="inline-flex cursor-pointer items-center rounded-md  px-2 py-0.5 text-xs font-semibold  text-white"
                  style={{
                    backgroundColor: usedPurchaseTiming.color,
                  }}
                >
                  {usedPurchaseTiming.text}

                  <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TradePrices
