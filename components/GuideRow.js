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

async function getPrices(itemId = 1, optionId = 1, unopened = false) {
  const response = await axiosInstance.get(`/item/${itemId}/option/${optionId}`, {
    params: {
      unopened,
    },
  })
  return response.data
}

const GuideRow = ({ itemId, imgSrc, name }) => {
  const { md, sm } = useScreenSize()
  const [state, refetch] = useAsync(getPrices, [1, 1], [])
  const { loading, data: fetchedData, error } = state

  return (
    <tr>
      <td colSpan={6}>
        <div className="flex flex-col p-3 xl:flex-row xl:space-x-4">
          <div className="xl:w-1/2">
            <div className="flex flex-col items-start bg-white dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row md:items-center">
              <Image
                width="452"
                height="420"
                className="h-48 w-full rounded-t-lg object-contain md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={imgSrc}
                alt={name}
              />
              <div className="flex max-w-md  flex-col justify-between pt-2 leading-normal md:p-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  새로운 가격대와 보노보노가 합쳐진 이 제품은 홀리 새로운 가격대와 보노보노가 합쳐진
                  이 제품은 홀리 새로운 가격대와 보노보노가 합쳐진 이 제품은 홀리
                </p>
              </div>
            </div>

            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 md:mt-2">
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/2 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      마지막 출시일부터 경과일
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex justify-between">
                      <span className="text-base font-medium text-blue-700 dark:text-white"></span>
                      <span className="text-sm font-medium text-blue-700 dark:text-white">45%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/2 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      마지막 출시일부터 경과일
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex justify-between">
                      <span className="text-base font-medium text-blue-700 dark:text-white"></span>
                      <span className="text-sm font-medium text-blue-700 dark:text-white">45%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-3 max-w-xl xl:mt-0 xl:w-1/2">
            <p className="text-md font-bold text-gray-900 dark:text-white">가격 그래프</p>

            {loading ? (
              <Skeleton borderRadius="0.5rem" height={md ? '12rem' : '5rem'} />
            ) : (
              <Line
                datasetIdKey="id"
                data={{
                  labels: ['5/7', '5/14', '5/12', '5/19'],
                  datasets: [
                    {
                      id: 1,
                      label: '가격',
                      data: [120, 114, 119, 120],
                    },
                  ],
                }}
              />
            )}

            <Link
              href="#"
              className="mt-3 inline-flex w-full  items-center justify-center rounded-lg  border  border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:w-auto"
              aria-label={`Link to #`}
            >
              가격 알아보기 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default GuideRow
