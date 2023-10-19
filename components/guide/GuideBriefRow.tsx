import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCallback, useState } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import GuideExpandedRow from '@/components/guide/GuideExpandedRow'
import amplitudeTrack from '@/lib/amplitude/track'
import { useQuery } from 'react-query'
import { getRecentRegularPrice, getRecentTradePrice } from 'utils/price'
import { OverallPurchaseTiming, ReleasePurchaseTiming } from '@/components/guide/PurchaseTiming'
import Image from '@/components/Image'

export interface ReleaseAmount {
  latestRelease: Date
  averageCycle: number
}

export interface PriceAmount {
  latestTradePrice: number
  latestRegularPrice: number
}

export const getReleaseAmountFromHistories = (
  histories: {
    date: Date
    info: string
  }[]
): ReleaseAmount => {
  const releases: number[] = histories
    .filter((history) => history.info === 'release')
    .map((history) => new Date(history.date).getTime())

  const { cycles }: { cycles: number[] } = releases.reduce(
    ({ last, cycles }: { last?: number; cycles: number[] }, cur: number) => ({
      last: cur,
      cycles: last ? [...cycles, Math.floor((last - cur) / (1000 * 60 * 60 * 24))] : cycles,
    }),
    { last: undefined, cycles: [] }
  )

  const averageCycle: number = Math.floor(cycles.reduce((a, b) => a + b, 0) / cycles.length)
  const latestRelease: Date = new Date(Math.max(...releases))
  return {
    latestRelease,
    averageCycle,
  }
}

const GuideBriefRow = ({ model }: { model: MainItemResponse }) => {
  const [isRowExpanded, setRowExpanded] = useState<boolean>(false)

  const {
    isLoading: loadingRecentRegularPrice,
    error: errorRecentRegularPrice,
    data: recentRegularPrice,
  } = useQuery(['recentRegularPrice', model.type, model.mainItem.id], () =>
    getRecentRegularPrice(model.type, model.mainItem.id)
  )

  const {
    isLoading: loadingRecentPrice,
    error: errorRecentPrice,
    data: recentPrice,
  } = useQuery(['recentPrice', model.type, model.mainItem.id, false, '전체'], () =>
    getRecentTradePrice(model.type, model.mainItem.id, false, '전체')
  )

  if (errorRecentRegularPrice || errorRecentPrice) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const toggleRow = (type, id) => {
    if (!isRowExpanded) {
      amplitudeTrack('toggle_guide_item', { type, id })
    }
    setRowExpanded(!isRowExpanded)
  }

  const getReleaseAmount = useCallback(
    () => getReleaseAmountFromHistories(model.histories),
    [model]
  )

  const getPriceAmount = useCallback(() => {
    const latestTradePrice: number = Number(recentPrice?.average)
    const latestRegularPrice: number = Number(recentRegularPrice?.price)

    return {
      latestTradePrice,
      latestRegularPrice,
    }
  }, [recentPrice, recentRegularPrice])

  return (
    <>
      <tr
        onClick={() => toggleRow(model.type, model.mainItem.id)}
        className="cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      >
        <td className="px-3 py-4 md:table-cell md:px-6">
          <FontAwesomeIcon icon={isRowExpanded ? faChevronUp : faChevronDown} />
        </td>
        <th
          scope="row"
          className="flex items-center whitespace-nowrap px-3 py-3 text-gray-900 dark:text-white md:px-6 md:py-4"
        >
          <div className="hidden h-10 w-10 md:block">
            <Image width={300} height={300} src={model.mainItem.image.url} alt={model.name} />
          </div>
          <div className="md:pl-3">
            <div className="text-base font-semibold">{model.name}</div>
          </div>
        </th>
        <td
          className="hidden px-3 py-3 sm:table-cell md:px-6 md:py-4"
          style={{ wordBreak: 'keep-all' }}
        >
          {getReleaseAmount().latestRelease.toLocaleDateString()}
        </td>
        <td
          className="hidden px-3  py-3 sm:table-cell md:px-6 md:py-4"
          style={{ wordBreak: 'keep-all' }}
        >
          {getReleaseAmount().averageCycle}일
        </td>
        <td className="px-3 py-3 md:px-6 md:py-4">
          <ReleasePurchaseTiming releaseAmount={getReleaseAmount()} />
        </td>
        <td className="px-3 py-3 md:px-6 md:py-4 ">
          <OverallPurchaseTiming
            loading={loadingRecentPrice || loadingRecentRegularPrice}
            releaseAmount={getReleaseAmount()}
            priceAmount={getPriceAmount()}
          />
        </td>
      </tr>
      {isRowExpanded && (
        <GuideExpandedRow
          loading={loadingRecentPrice || loadingRecentRegularPrice}
          model={model}
          releaseAmount={getReleaseAmount()}
          priceAmount={getPriceAmount()}
        />
      )}
    </>
  )
}

export default GuideBriefRow
