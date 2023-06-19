import { PageSEO } from '@/components/SEO'
import React, { useCallback, useEffect } from 'react'

import NewsletterForm from '@/components/NewsletterForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import GuideRow from '@/components/GuideRow'
import { useState } from 'react'
import Image from 'next/image'
import { useScreenSize } from 'hooks/useScreenSize'
import categories from '@/data/guide/categories'
import amplitude from 'amplitude-js'

const purchaseTiming = {
  good: {
    color: 'green-500',
    text: '구매 적합',
  },
  normal: {
    color: 'yellow-500',
    text: '구매 주의',
  },
  bad: {
    color: 'red-500',
    text: '구매 보류',
  },
}

export default function BuyersGuide() {
  const [currentCategory, setCurrentCategory] = useState(categories[1])
  const [expandedRows, setExpandedRows] = useState([])
  const { md, sm } = useScreenSize()

  useEffect(() => {
    amplitude
      .getInstance()
      .logEvent('page_view', { page_type: 'guide', page_detail: categories[1].categoryName })
  }, [])

  const onClickCategory = (category) => {
    amplitude
      .getInstance()
      .logEvent('page_view', { page_type: 'guide', page_detail: category.categoryName })

    if (category.categoryData.length === 0) {
      alert('준비 중입니다! 이메일을 등록해주시면 가장 먼저 업데이트 소식을 알려드릴게요.')
      return
    }

    setExpandedRows([])
    setCurrentCategory(category)
  }

  const toggleRow = (itemId) => {
    const isRowExpanded = expandedRows.includes(itemId)
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((row) => row !== itemId))
    } else {
      setExpandedRows([...expandedRows, itemId])
    }
    amplitude
      .getInstance()
      .logEvent('do_action', { action_type: 'guide_toggle', action_detail: itemId })
  }

  const getPurchaseTiming = useCallback((releasedDateHistory) => {
    const latestReleaseDate = releasedDateHistory[0]
    const averageReleaseCycle = getAverageReleaseCycle(releasedDateHistory)
    const today = new Date()
    const [year, month, day] = latestReleaseDate.split('-')
    const date = new Date(year, month - 1, day)
    const diffTime = Math.abs(today - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > averageReleaseCycle * 0.85) {
      return purchaseTiming.bad
    } else if (diffDays > averageReleaseCycle * 0.6) {
      return purchaseTiming.normal
    } else {
      return purchaseTiming.good
    }
  }, [])

  const getLatestReleaseDate = useCallback((releasedDateHistory) => {
    const latestReleaseDate = releasedDateHistory[0]

    // convert YYYY-MM-DD string to locale string
    const [year, month, day] = latestReleaseDate.split('-')
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString()
  }, [])

  const getAverageReleaseCycle = useCallback((releasedDateHistory) => {
    const releaseCycles = []
    for (let i = 0; i < releasedDateHistory.length - 1; i++) {
      // convert YYYY-MM-DD string to Date object
      const date1 = new Date(...releasedDateHistory[i].split('-'))
      const date2 = new Date(...releasedDateHistory[i + 1].split('-'))
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      releaseCycles.push(diffDays)
    }

    const averageReleaseCycle = Math.round(
      releaseCycles.reduce((a, b) => a + b, 0) / releaseCycles.length
    )
    return averageReleaseCycle
  }, [])

  return (
    <>
      <PageSEO
        title={'애플 제품 구매 가이드'}
        description={'지금 사도 괜찮을까? 애플 제품의 적절한 구매시기를 알려드립니다.'}
      />

      <section className="mt-md-6 mt-3">
        <div className="space-y-2 pt-6 pb-2">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            애플 제품 구매 가이드
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            출시 주기 및 중고거래 데이터를 기반으로 적정 구매시기를 제공합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center pt-4 pb-2">
          {categories.map((category) => (
            <button
              onClick={() => {
                onClickCategory(category)
              }}
              key={category.categoryName}
              type="button"
              className={`${
                currentCategory.categoryName === category.categoryName
                  ? 'border-blue-600'
                  : 'border-white'
              } ${
                category.categoryData.length > 0 ? 'text-blue-700' : 'text-gray-300'
              } mr-3 mb-3 rounded-full border  bg-white px-5 py-2.5 text-center text-base font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:bg-gray-900 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3 md:table-cell md:px-6"></th>
                <th scope="col" className="w-1/3 px-3 py-3 md:px-6">
                  모델명
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3 sm:table-cell md:px-6"
                  style={{ wordBreak: 'keep-all' }}
                >
                  마지막 출시일
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3 sm:table-cell md:px-6"
                  style={{ wordBreak: 'keep-all' }}
                >
                  평균 출시주기
                </th>
                <th scope="col" className="px-3 py-3 md:px-6" style={{ wordBreak: 'keep-all' }}>
                  구매 적합도
                </th>
              </tr>
            </thead>
            <tbody>
              {categories
                .find((category) => category.categoryName === currentCategory.categoryName)
                .categoryData.map(({ id, model, releasedDateHistory, data, desc }, index) => (
                  <React.Fragment key={id}>
                    <tr
                      onClick={() => toggleRow(id)}
                      className={`${
                        expandedRows.includes(id) && index ? 'border-t' : ''
                      } cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600`}
                    >
                      <td className="px-3 py-4 md:table-cell md:px-6">
                        <FontAwesomeIcon
                          icon={expandedRows.includes(id) ? faChevronUp : faChevronDown}
                        />
                      </td>
                      <th
                        scope="row"
                        className="flex items-center whitespace-nowrap px-3 py-3 text-gray-900 dark:text-white md:px-6 md:py-4"
                      >
                        <img
                          className="hidden h-10 w-10 md:block"
                          src={data.slice(-1)[0].imgSrc}
                          alt={model}
                        />
                        <div className="md:pl-3">
                          <div className="text-base font-semibold">{model}</div>
                        </div>
                      </th>
                      <td
                        className="hidden px-3 py-3 sm:table-cell md:px-6 md:py-4"
                        style={{ wordBreak: 'keep-all' }}
                      >
                        {getLatestReleaseDate(releasedDateHistory)}
                      </td>
                      <td
                        className="hidden px-3  py-3 sm:table-cell md:px-6 md:py-4"
                        style={{ wordBreak: 'keep-all' }}
                      >
                        {getAverageReleaseCycle(releasedDateHistory)}일
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4">
                        <div className="flex  items-center">
                          <div
                            className={`mr-2 h-2.5 w-2.5 rounded-full bg-${
                              getPurchaseTiming(releasedDateHistory).color
                            }`}
                          ></div>
                          <span>{getPurchaseTiming(releasedDateHistory).text}</span>
                        </div>
                      </td>
                    </tr>
                    {expandedRows.includes(id) && (
                      <GuideRow
                        name={model}
                        itemId={id}
                        itemDesc={desc}
                        imgSrc={data.slice(-1)[0].imgSrc}
                        latestReleaseDate={releasedDateHistory[0]}
                        averageReleaseCycle={getAverageReleaseCycle(releasedDateHistory)}
                        purchaseTiming={getPurchaseTiming(releasedDateHistory)}
                      />
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
