import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import React from 'react'

import NewsletterForm from '@/components/NewsletterForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'
import Image from 'next/image'
import { useScreenSize } from 'hooks/useScreenSize'

export default function BuyersGuide() {
  const [expandedRows, setExpandedRows] = useState([])
  const { md, sm } = useScreenSize()

  const tableData = [
    {
      name: '맥북프로 13인치 (M1)',
      lastReleaseDate: '2020년 11월',
      averageReleaseCycle: '15일',
      price: '적정',
      chartData: {
        labels: ['5/7', '5/14', '5/12', '5/19'],
        datasets: [
          {
            id: 1,
            label: '가격',
            data: [120, 114, 119, 120],
          },
        ],
      },
    },
    {
      name: '맥북프로 13인치 (M1)',
      lastReleaseDate: '2020년 11월',
      averageReleaseCycle: '15일',
      price: '적정',
      chartData: {
        labels: ['5/7', '5/14', '5/12', '5/19'],
        datasets: [
          {
            id: 1,
            label: '가격',
            data: [120, 114, 119, 120],
          },
        ],
      },
    },
  ]

  const toggleRow = (rowIndex) => {
    const isRowExpanded = expandedRows.includes(rowIndex)
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((row) => row !== rowIndex))
    } else {
      setExpandedRows([...expandedRows, rowIndex])
    }
  }

  return (
    <>
      <PageSEO title={'맥 구매 가이드'} description={'이 맥, 지금 사도 괜찮을까?'} />

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pt-6 pb-2">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            맥 구매 가이드
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            맥 중고거래 데이터를 기반으로 적정 구매시기를 제공합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center pt-4 pb-2">
          <button
            type="button"
            className="mr-3 mb-3 rounded-full border border-blue-600 bg-white px-5 py-2.5 text-center text-base font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:bg-gray-900 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            iPhone
          </button>
          <button
            type="button"
            className="mr-3 mb-3 rounded-full border border-white bg-white px-5 py-2.5 text-center text-base font-medium text-gray-900 hover:border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-white dark:hover:border-gray-700 dark:focus:ring-gray-800"
          >
            iPad
          </button>
          <button
            type="button"
            className="mr-3 mb-3 rounded-full border border-white bg-white px-5 py-2.5 text-center text-base font-medium text-gray-900 hover:border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-white dark:hover:border-gray-700 dark:focus:ring-gray-800"
          >
            Mac
          </button>
          <button
            type="button"
            className="mr-3 mb-3 rounded-full border border-white bg-white px-5 py-2.5 text-center text-base font-medium text-gray-900 hover:border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-white dark:hover:border-gray-700 dark:focus:ring-gray-800"
          >
            Music
          </button>
          <button
            type="button"
            className="mr-3 mb-3 rounded-full border border-white bg-white px-5 py-2.5 text-center text-base font-medium text-gray-900 hover:border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-white dark:hover:border-gray-700 dark:focus:ring-gray-800"
          >
            Watch & TV
          </button>
        </div>

        <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="hidden px-6 py-3 md:table-cell"></th>
                <th scope="col" className="px-3 py-3 md:px-6">
                  모델명
                </th>
                <th scope="col" className="px-3 py-3 md:px-6" style={{ wordBreak: 'keep-all' }}>
                  마지막 출시일
                </th>
                <th scope="col" className="px-3 py-3 md:px-6" style={{ wordBreak: 'keep-all' }}>
                  평균 출시주기
                </th>
                <th scope="col" className="px-3 py-3 md:px-6" style={{ wordBreak: 'keep-all' }}>
                  구매 적합도
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(
                ({ name, lastReleaseDate, averageReleaseCycle, price, chartData }, index) => (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => toggleRow(index)}
                      className={`${
                        expandedRows.includes(index - 1) && index ? 'border-t' : ''
                      } cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600`}
                    >
                      <td className="hidden px-6 py-4 md:table-cell">
                        <FontAwesomeIcon
                          icon={expandedRows.includes(index) ? faChevronUp : faChevronDown}
                        />
                      </td>
                      <th
                        scope="row"
                        className="flex items-center whitespace-nowrap px-3 py-3 text-gray-900 dark:text-white md:px-6 md:py-4"
                      >
                        <img
                          className="hidden h-10 w-10 md:block"
                          src="/static/images/time-machine.jpg"
                          alt="Jese image"
                        />
                        <div className="md:pl-3">
                          <div className="text-base font-semibold">{name}</div>
                        </div>
                      </th>
                      <td className="px-3 py-3 md:px-6 md:py-4" style={{ wordBreak: 'keep-all' }}>
                        {lastReleaseDate}
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4" style={{ wordBreak: 'keep-all' }}>
                        {averageReleaseCycle}
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4">
                        <div className="flex  items-center">
                          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>{' '}
                          {sm && price}
                        </div>
                      </td>
                    </tr>
                    {expandedRows.includes(index) && (
                      <tr>
                        <td colSpan={6}>
                          <div className="flex flex-col space-x-4 p-3 xl:flex-row">
                            <div className="xl:w-1/2">
                              <div className="flex flex-col items-start bg-white dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row md:items-center">
                                <img
                                  className="h-48 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                  src="/static/images/time-machine.jpg"
                                  alt=""
                                />
                                <div className="flex max-w-md  flex-col justify-between pt-2 leading-normal md:p-4">
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    맥북프로 13인치 (M2)
                                  </h5>
                                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    새로운 가격대와 보노보노가 합쳐진 이 제품은 홀리 새로운 가격대와
                                    보노보노가 합쳐진 이 제품은 홀리 새로운 가격대와 보노보노가
                                    합쳐진 이 제품은 홀리
                                  </p>
                                </div>
                              </div>

                              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
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
                                        <span className="text-sm font-medium text-blue-700 dark:text-white">
                                          45%
                                        </span>
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
                                        <span className="text-sm font-medium text-blue-700 dark:text-white">
                                          45%
                                        </span>
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
                              <p className="text-md font-bold text-gray-900 dark:text-white">
                                가격 그래프
                              </p>
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

                              <Link
                                href={'#'}
                                class="mt-3 inline-flex  items-center rounded-lg  border border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                aria-label={`Link to #`}
                              >
                                가격 알아보기 &rarr;
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-3 flex items-center justify-center pt-4 md:mt-20">
        <NewsletterForm />
      </div>
    </>
  )
}
