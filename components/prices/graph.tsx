import amplitudeTrack from '@/lib/amplitude/track'
import { useScreenSize } from 'hooks/useScreenSize'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { getTotalCoupangPrice, getTotalRegularPrice, getTotalTradePrice } from 'utils/price'
import Link from '@/components/Link'
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
import useAuthorization from 'hooks/useAuthorization'

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
  const { isUserLoggedIn } = useAuthorization()

  // 전체 시세 조회
  const {
    isLoading: loadingTotalPrice,
    error: errorTotalPrice,
    data: totalPriceData,
  } = useQuery(['totalPrice', item.type, item.id, unused, source], () =>
    getTotalTradePrice(item.type, item.id, unused, source)
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

  const onClickLogin = useCallback(() => {
    amplitudeTrack('click_login_my_page')
  }, [])

  return (
    <div className="mt-5">
      <p className="text-md font-bold text-gray-900 dark:text-white">가격 그래프</p>

      {loading ? (
        <Skeleton className="mt-3" height={md ? '15rem' : '8rem'} />
      ) : (
        <div className="relative">
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
                  label: '공홈',
                  data: totalRegularPrice?.slice(-90).map((price) => price.price || null),
                  // Set the line color with gray
                  borderColor: 'rgb(119, 124, 124)', // Set the line color
                  backgroundColor: 'rgba(119, 124, 124, 0.2)', // Set the fill color
                  pointRadius: 0,
                },
              ],
            }}
          />

          {!isUserLoggedIn && (
            <div className="absolute top-0 left-0 h-full w-full backdrop-blur-sm backdrop-grayscale">
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <p className="mb-3 ">그래프는 로그인 후 확인 가능합니다.</p>
                <Link
                  onClick={onClickLogin}
                  href="/login"
                  className="w-fit rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white"
                >
                  로그인
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PriceGraph
