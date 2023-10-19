import { useScreenSize } from 'hooks/useScreenSize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Link from '@/components/Link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCallback } from 'react'
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
import amplitudeTrack from '@/lib/amplitude/track'
import { useQuery } from 'react-query'
import { getTotalTradePrice } from 'utils/price'
import { PriceAmount, ReleaseAmount } from '@/components/guide/GuideBriefRow'
import { ReleasePurchaseDetail } from '@/components/guide/PurchaseTiming'
import { getModelType } from '@/lib/utils/model'
import Image from '@/components/Image'

Chart.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
})

const GuideExpandedRow = ({
  loading,
  model,
  releaseAmount,
  priceAmount,
}: {
  model: MainItemResponse
  loading: boolean
  releaseAmount: ReleaseAmount
  priceAmount: PriceAmount
}) => {
  const { md } = useScreenSize()

  const {
    isLoading: loadingTotalPrice,
    error: errorTotalPrice,
    data: totalPrice,
  } = useQuery(['totalPrice', model.type, model.mainItem.id, false, '전체'], () =>
    getTotalTradePrice(model.type, model.mainItem.id, false, '전체')
  )

  if (errorTotalPrice) {
    alert('데이터 조회에 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const getPriceDiff = useCallback((): number => {
    if (!totalPrice) return 0

    const price = [...totalPrice]
    return Number(price.pop()?.average) - Number(price.pop()?.average)
  }, [totalPrice])

  const onClickShowMorePrice = useCallback((type, id) => {
    amplitudeTrack('click_show_more_price_info_guide', { type, id })
  }, [])

  return (
    <tr className="border-b">
      <td colSpan={6}>
        <div className="flex flex-col p-3 xl:flex-row xl:space-x-4">
          <div className="xl:w-1/2">
            <div className="flex flex-col items-start bg-white dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row md:items-center">
              <Image
                width={452}
                height={420}
                className="h-48 w-full rounded-t-lg object-contain md:h-auto md:rounded-none md:rounded-l-lg"
                src={model.mainItem.image.url}
                alt={model.name}
              />
              <div className="flex w-4/5  max-w-md flex-col justify-between pt-2 leading-normal md:p-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {model.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {model.description}
                </p>
              </div>
            </div>

            <ul className="mx-auto mt-3 max-w-md divide-y divide-gray-200 dark:divide-gray-700 ">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/2 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      마지막 출시일
                    </p>
                  </div>

                  <strong className="flex-1 text-right">
                    {releaseAmount.latestRelease.toLocaleDateString()}
                  </strong>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/2 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      평균 출시주기
                    </p>
                  </div>

                  <div className="flex-1 text-right">
                    <strong>{releaseAmount.averageCycle}</strong>일
                  </div>
                </div>
              </li>

              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/3 min-w-0 md:w-1/2">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      출시 현황
                    </p>
                  </div>

                  <div className="flex-1">
                    <ReleasePurchaseDetail loading={loading} releaseAmount={releaseAmount} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-3 max-w-xl md:mx-auto md:w-2/3 xl:mt-0 xl:w-1/2">
            <div className="mx-auto max-w-md">
              <p className="text-md mb-2 font-bold text-gray-900 dark:text-white">최근 중고 시세</p>
              {loadingTotalPrice ? (
                <Skeleton borderRadius="0.5rem" height={md ? '14rem' : '10rem'} />
              ) : (
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: totalPrice?.slice(-90).map((price) =>
                      // format to MMDD in en-US locale
                      new Date(price.date).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                      })
                    ),
                    datasets: [
                      {
                        label: `중고 시세 (기본형 S급 기준)`,
                        data: totalPrice?.slice(-90).map((price) => price.average || null),
                        borderColor: 'rgba(255, 99, 132, 1)', // Set the line color
                        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Set the fill color
                        pointRadius: 0,
                      },
                    ],
                  }}
                />
              )}
              <ul className="mx-auto mt-3 max-w-md divide-y divide-gray-200 dark:divide-gray-700 ">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-1/2 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        정가
                      </p>
                      <div>기본형 기준</div>
                    </div>
                    <div className="flex-1 text-right">
                      {loading ? (
                        <Skeleton width={md ? '5rem' : '3rem'} borderRadius="0.5rem" />
                      ) : (
                        <>
                          <strong>{priceAmount.latestRegularPrice.toLocaleString()}</strong>&nbsp;원
                        </>
                      )}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-1/2 min-w-0">
                      <>
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          최신 중고 시세
                        </p>
                        <div>기본형 S급 기준</div>
                      </>
                    </div>

                    <div className="flex-1 text-right">
                      {loading || loadingTotalPrice ? (
                        <Skeleton width={md ? '5rem' : '3rem'} borderRadius="0.5rem" />
                      ) : (
                        <div>
                          <strong>{priceAmount.latestTradePrice.toLocaleString()}</strong>
                          &nbsp;원
                          <div>
                            <span
                              className={getPriceDiff() > 0 ? 'text-red-400' : 'text-green-500'}
                            >
                              {getPriceDiff() > 0 ? (
                                <FontAwesomeIcon icon={faCaretUp} className="mr-1" />
                              ) : (
                                <FontAwesomeIcon icon={faCaretDown} className="mr-1" />
                              )}
                              <strong>{Math.abs(getPriceDiff()).toLocaleString()}</strong>
                            </span>
                            &nbsp;원
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </ul>

              <Link
                href={`/prices/${getModelType(model.type)}/${model.mainItem.id}`}
                className="mt-3 inline-flex w-full  items-center justify-center rounded-lg  border  border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mt-4  xl:w-auto"
                onClick={onClickShowMorePrice}
              >
                가격 알아보기 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default GuideExpandedRow
