import amplitudeTrack from '@/lib/amplitude/track'
import { useScreenSize } from 'hooks/useScreenSize'
import { useRouter } from 'next/router'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { Source, getTotalCoupangPrice, getTotalRegularPrice, getTotalTradePrice } from 'utils/price'
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
            labels: totalPriceData?.map((price) =>
              // format to MMDD in en-US locale
              new Date(price.date).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
              })
            ),
            datasets: [
              {
                label: '평균시세',
                data: totalPriceData?.map((price) => price.average || null),
              },
              {
                label: '쿠팡가격',
                data: totalCoupangPriceData?.map((price) => price.price || null),
              },
              {
                label: '정가',
                data: totalRegularPrice?.map((price) => price.price || null),
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default PriceGraph
