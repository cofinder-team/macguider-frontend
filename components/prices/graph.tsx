import amplitudeTrack from '@/lib/amplitude/track'
import { useScreenSize } from 'hooks/useScreenSize'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { Source, getTotalCoupangPrice, getTotalRegularPrice, getTotalTradePrice } from 'utils/price'
import { useCookies } from 'react-cookie'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
})

interface Props {
  item: ItemResponse
  unused: boolean
  source: Source
}

const PriceGraph = ({ item, unused, source }: Props) => {
  const router = useRouter()
  const { md } = useScreenSize()

  // 전체 시세 조회
  const {
    isLoading: loadingTotalPrice,
    error: errorTotalPrice,
    data: totalPriceData,
  } = useQuery(['totalPrice', 'M', item.id, unused, source], () =>
    getTotalTradePrice('M', item.id, unused, source)
  )

  // 전체 쿠팡 가격 조회
  const {
    isLoading: loadingTotalCoupangPrice,
    error: errorTotalCoupangPrice,
    data: totalCoupangPriceData,
  } = useQuery(['totalCoupangPrice', item.id], () => getTotalCoupangPrice(item.type, item.id))

  // 전체 정가 조회
  const {
    isLoading: loadingTotalRegularPrice,
    error: errorTotalRegularPrice,
    data: totalRegularPrice,
  } = useQuery(['totalRegularPrice', item.id], () => getTotalRegularPrice(item.type, item.id))

  const loading = loadingTotalPrice || loadingTotalCoupangPrice || loadingTotalRegularPrice

  if (errorTotalPrice || errorTotalCoupangPrice || errorTotalRegularPrice) {
    alert('데이터 조회에 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  return (
    <div className="mt-5">
      <p className="text-md font-bold text-gray-900 dark:text-white">가격 그래프</p>

      {loading ? (
        <Skeleton className="mt-3" height={md ? '15rem' : '8rem'} />
      ) : (
        <Line
          datasetIdKey="id"
          data={{
            labels: totalPriceData?.slice(-90).map((price) =>
              // format to MMDD in en-US locale
              new Date(price.date).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
              })
            ),
            datasets: [
              {
                label: `중고${unused ? '(미개봉)' : '(S급)'}`,
                data: totalPriceData?.slice(-90).map((price) => price.average || null),
                borderColor: 'rgba(255, 99, 132, 1)', // Set the line color
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Set the fill color
                pointRadius: 0,
              },
              {
                label: '쿠팡',
                data: totalCoupangPriceData?.slice(-90).map((price) => price.price || null),
                borderColor: 'rgba(54, 162, 235, 1)', // Set the line color
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Set the fill color
                pointRadius: 0,
              },
              {
                label: '정가',
                data: totalRegularPrice?.slice(-90).map((price) => price.price || null),
                // Set the line color with gray
                borderColor: 'rgb(119, 124, 124)', // Set the line color
                backgroundColor: 'rgba(119, 124, 124, 0.2)', // Set the fill color
                pointRadius: 0,
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default PriceGraph
