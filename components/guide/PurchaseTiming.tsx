import { useScreenSize } from 'hooks/useScreenSize'
import Skeleton from 'react-loading-skeleton'
import { PriceAmount, ReleaseAmount } from '@/components/guide/GuideBriefRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface PurchaseTimingDetail {
  bgColor: string
  color: string
  text: string
}

interface PurchaseTimingOptions {
  good: PurchaseTimingDetail
  normal: PurchaseTimingDetail
  bad: PurchaseTimingDetail
}

const purchaseTimingOptions: PurchaseTimingOptions = {
  good: {
    bgColor: '#dcfce7',
    color: '#22C55E',
    text: '추천',
  },
  normal: {
    bgColor: '#fef9c3',
    color: '#EAB308',
    text: '애매함',
  },
  bad: {
    bgColor: '#fca5a5',
    color: '#EF4444',
    text: '경고',
  },
} as const

const getDaysSinceLastReleaseDate = (latestRelease: Date): number => {
  const diffTime = Math.abs(new Date().getTime() - latestRelease.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getReleaseFitScore = ({ latestRelease, averageCycle }: ReleaseAmount): number => {
  const diffDays = getDaysSinceLastReleaseDate(latestRelease)
  return (1 - diffDays / averageCycle) * 100
}

const getPriceFitScore = ({ latestTradePrice, latestRegularPrice }: PriceAmount): number => {
  return (latestTradePrice / latestRegularPrice) * 100
}

const getOverallFitScore = ({
  releaseAmount,
  priceAmount,
}: {
  releaseAmount: ReleaseAmount
  priceAmount: PriceAmount
}): number => {
  const priceFitScore = getPriceFitScore(priceAmount)
  const releaseFitScore = getReleaseFitScore(releaseAmount)
  return priceFitScore * 0.6 + releaseFitScore * 0.4
}

export const PurchaseTiming = ({
  loading = false,
  badge = false,
  option,
}: {
  loading?: boolean
  badge?: boolean
  option: keyof PurchaseTimingOptions
}) => {
  const { md } = useScreenSize()

  return loading ? (
    <Skeleton width={md ? '5rem' : '3rem'} borderRadius="0.5rem" />
  ) : badge ? (
    <div
      className="inline-flex cursor-pointer items-center rounded-md  px-2 py-0.5 text-xs font-semibold  text-white"
      style={{
        backgroundColor: purchaseTimingOptions[option].color,
      }}
    >
      {purchaseTimingOptions[option].text}
      <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
    </div>
  ) : (
    <div style={{ width: md ? '5rem' : '3rem' }} className="flex items-center">
      <div
        className="mr-2 h-2.5 w-2.5 rounded-full"
        style={{
          backgroundColor: purchaseTimingOptions[option].color,
        }}
      ></div>
      <span>{purchaseTimingOptions[option].text}</span>
    </div>
  )
}

export const ReleasePurchaseTiming = ({
  loading = false,
  badge = false,
  releaseAmount,
}: {
  loading?: boolean
  badge?: boolean
  releaseAmount: ReleaseAmount
}) => {
  const releaseFitScore = getReleaseFitScore(releaseAmount)

  return (
    <PurchaseTiming
      loading={loading}
      badge={badge}
      option={releaseFitScore >= 40 ? 'good' : releaseFitScore >= 15 ? 'normal' : 'bad'}
    />
  )
}
export const OverallPurchaseTiming = ({
  loading = false,
  badge = false,
  releaseAmount,
  priceAmount,
}: {
  loading?: boolean
  badge?: boolean
  releaseAmount: ReleaseAmount
  priceAmount: PriceAmount
}) => {
  const overallFitScore = getOverallFitScore({ releaseAmount, priceAmount })

  return (
    <PurchaseTiming
      loading={loading}
      badge={badge}
      option={overallFitScore >= 61 ? 'good' : overallFitScore >= 40 ? 'normal' : 'bad'}
    />
  )
}

export const ReleasePurchaseDetail = ({
  loading = false,
  releaseAmount,
}: {
  loading?: boolean
  releaseAmount: ReleaseAmount
}): JSX.Element => {
  const releaseFitScore = getReleaseFitScore(releaseAmount)
  const option = releaseFitScore >= 40 ? 'good' : releaseFitScore >= 15 ? 'normal' : 'bad'
  const color = purchaseTimingOptions[option].color

  const daysSinceLastReleaseDate = getDaysSinceLastReleaseDate(releaseAmount.latestRelease)
  const ratio = Math.min((daysSinceLastReleaseDate / releaseAmount.averageCycle) * 100, 100)

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <div className="mb-1 flex justify-between">
        <span className={` text-sm font-medium dark:text-white`}>마지막 출시 이후</span>

        <div className="text-sm">
          <strong className="font-semibold dark:text-white" style={{ color }}>
            {daysSinceLastReleaseDate}
          </strong>
          <span>일 지남</span>
        </div>
      </div>
      <div className="h-2s.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${ratio}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </>
  )
}
