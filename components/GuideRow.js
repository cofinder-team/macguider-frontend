import Image from 'next/image'
import { useScreenSize } from 'hooks/useScreenSize'
import useAsync from 'hooks/useAsync'
import axiosInstance from '@/lib/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from '@/components/Link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { useCallback } from 'react'

async function getPrices(itemId = 1, optionId = 1, unopened = false) {
  const response = await axiosInstance.get(`/item/${itemId}/option/${optionId}`, {
    params: {
      unopened,
    },
  })
  return response.data
}

const GuideRow = ({
  itemId,
  optionId,
  itemDesc,
  imgSrc,
  name,
  latestReleaseDate,
  averageReleaseCycle,
  purchaseTiming,
  href,
}) => {
  const { md, sm } = useScreenSize()
  const [state, refetch] = useAsync(getPrices, [itemId, optionId], [])
  const { loading, data: fetchedData, error } = state

  const getRatio = useCallback(() => {
    const ratio = Math.min(
      Math.round((getDaysSinceLastReleaseDate() / averageReleaseCycle) * 100),
      100
    )

    return ratio
  }, [averageReleaseCycle, getDaysSinceLastReleaseDate])

  const getDaysSinceLastReleaseDate = useCallback(() => {
    const today = new Date()
    const [year, month, date] = latestReleaseDate.split('-')

    const daysSinceLastReleaseDate = Math.floor(
      (today.getTime() - new Date(year, month - 1, date).getTime()) / (1000 * 60 * 60 * 24)
    )

    return daysSinceLastReleaseDate
  }, [latestReleaseDate])

  return (
    <tr className="border-b">
      <td colSpan={6}>
        <div className="flex flex-col p-3 xl:flex-row xl:space-x-4">
          <div className="xl:w-1/2">
            <div className="flex flex-col items-start bg-white dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row md:items-center">
              <Image
                width="452"
                height="420"
                className="h-48 w-full rounded-t-lg object-contain md:h-auto md:rounded-none md:rounded-l-lg"
                src={imgSrc}
                alt={name}
              />
              <div className="flex w-4/5  max-w-md flex-col justify-between pt-2 leading-normal md:p-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{itemDesc}</p>
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

                  <strong className="flex-1 text-right">{latestReleaseDate}</strong>
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
                    <strong>{averageReleaseCycle}</strong>일
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
                    <div className="mb-1 flex justify-between">
                      <span className={` text-sm font-medium dark:text-white`}>
                        마지막 출시 이후
                      </span>

                      <div className="text-sm">
                        <strong
                          className="font-semibold dark:text-white"
                          style={{ color: `${purchaseTiming.color}` }}
                        >
                          {getDaysSinceLastReleaseDate()}
                        </strong>
                        <span>일 지남</span>
                      </div>
                    </div>
                    <div className="h-2s.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${getRatio()}%`,
                          backgroundColor: `${purchaseTiming.color}`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-3 max-w-xl md:mx-auto md:w-2/3 xl:mt-0 xl:w-1/2">
            <p className="text-md font-bold text-gray-900 dark:text-white">최근 중고 시세</p>

            {loading || !fetchedData ? (
              <Skeleton borderRadius="0.5rem" height={md ? '18rem' : '10rem'} />
            ) : (
              <Line
                datasetIdKey="id"
                data={{
                  labels: fetchedData.data.map((price) =>
                    // format to MMDD in en-US locale
                    new Date(price.date).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                    })
                  ),
                  datasets: [
                    {
                      id: 1,
                      label: '평균시세',
                      data: fetchedData.data.map((price, _index) => (price.mid ? price.mid : null)),
                    },
                  ],
                }}
              />
            )}

            <Link
              href={href}
              className="mt-3 inline-flex w-full  items-center justify-center rounded-lg  border  border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mt-4  xl:w-auto"
              aria-label={`Link to #`}
            >
              더 알아보기 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default GuideRow
