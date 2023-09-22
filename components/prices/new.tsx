import amplitudeTrack from '@/lib/amplitude/track'
import { useScreenSize } from 'hooks/useScreenSize'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { getRecentCoupangPrice, getTotalRegularPrice } from 'utils/price'
import CoupangLogo from '@/data/coupang_logo.svg'
import { getReleaseAmountFromHistories } from '@/components/guide/GuideBriefRow'
import { ReleasePurchaseTiming } from '@/components/guide/PurchaseTiming'

interface Props {
  model: MainItemResponse
  item: ItemResponse
}

const NewPrices = ({ model, item }: Props) => {
  const router = useRouter()
  const { md } = useScreenSize()

  // 현재 쿠팡 가격 조회
  const {
    isLoading: loadingRecentCoupangPrice,
    error: errorRecentCoupangPrice,
    data: recentCoupangPrice,
  } = useQuery(['recentCoupangPrice', item.type, item.id], () =>
    getRecentCoupangPrice(item.type, item.id)
  )

  // 전체 정가 조회
  const {
    isLoading: loadingTotalRegularPrice,
    error: errorTotalRegularPrice,
    data: totalRegularPrice,
  } = useQuery(['totalRegularPrice', item.type, item.id], () =>
    getTotalRegularPrice(item.type, item.id)
  )

  const loading = loadingRecentCoupangPrice || loadingTotalRegularPrice

  if (errorRecentCoupangPrice || errorTotalRegularPrice) {
    alert('데이터 조회에 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const recentRegularPrice = useMemo(() => {
    if (!totalRegularPrice) return null
    return totalRegularPrice.slice(-1)[0].price
  }, [totalRegularPrice])

  const coupangLastUpdatedTime = useMemo(() => {
    if (recentCoupangPrice && recentCoupangPrice.log) {
      const now = new Date()
      const lastUpdated = new Date(recentCoupangPrice.log)

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
  }, [recentCoupangPrice])

  const getReleaseAmount = useCallback(
    () => getReleaseAmountFromHistories(model.histories),
    [model]
  )

  const onClickBuyersGuide = useCallback(() => {
    amplitudeTrack('click_route_buyers_guide', { type: item.type, id: item.id })
    router.push('/buyers-guide')
  }, [item.id, item.type, router])

  return (
    <div className="mt-5">
      <p className="text-md font-bold text-gray-900 dark:text-white">새제품 가격</p>

      <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                애플스토어
              </p>
            </div>
            <div className="text-base font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
              ) : recentRegularPrice ? (
                <>
                  <span>{recentRegularPrice.toLocaleString()}</span>
                  <span className="ml-1 font-normal">원</span>
                </>
              ) : (
                '단종'
              )}
            </div>
          </div>
        </li>

        <li className="py-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="w-16 truncate text-sm font-medium text-gray-900 grayscale dark:text-white">
                <CoupangLogo />
              </p>
            </div>
            <div className="text-right text-base font-semibold text-gray-900">
              {loading ? (
                <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
              ) : recentCoupangPrice && recentCoupangPrice.price ? (
                <>
                  <span>{recentCoupangPrice.price.toLocaleString()}</span>
                  <span className="ml-1 font-normal">원</span>

                  <div className="truncate text-xs">
                    <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                    <span className="truncate text-gray-600">{coupangLastUpdatedTime}</span>
                  </div>
                </>
              ) : recentCoupangPrice && recentCoupangPrice.log ? (
                <>
                  <span>품절</span>
                  <div className="truncate text-xs">
                    <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                    <span className="truncate text-gray-600">{coupangLastUpdatedTime}</span>
                  </div>
                </>
              ) : (
                <span>단종</span>
              )}
            </div>
          </div>
        </li>
      </ul>

      {
        // 현재 애플스토어에 판매 중인 제품에 대해서만 가이드 표시

        loading ? (
          <Skeleton className="max-w-md" height="4rem" borderRadius="0.5rem" />
        ) : (
          <div
            onClick={onClickBuyersGuide}
            className="max-w-md cursor-pointer rounded bg-gray-100 py-3 sm:py-4"
          >
            <div className="flex items-center space-x-4 pr-2">
              <div className="flex-shrink-0"></div>
              <div className="min-w-0 flex-1 ">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  구매시기 가이드
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  지금 새제품을 사도 괜찮을까요?
                </p>
              </div>

              {model.histories.length >= 2 && (
                <ReleasePurchaseTiming badge={true} releaseAmount={getReleaseAmount()} />
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default NewPrices
