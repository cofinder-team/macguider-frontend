import { PageSEO } from '@/components/SEO'
import React, { useEffect } from 'react'

import NewsletterForm from '@/components/NewsletterForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import GuideRow from '@/components/GuideRow'
import { useState } from 'react'
import Image from 'next/image'
import { useScreenSize } from 'hooks/useScreenSize'
import categories from '@/data/guide/categories'
import amplitude from 'amplitude-js'

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
    setExpandedRows([])
    setCurrentCategory(category)
    amplitude
      .getInstance()
      .logEvent('page_view', { page_type: 'guide', page_detail: category.categoryName })
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

  return (
    <>
      <PageSEO
        title={'애플 제품 구매 가이드'}
        description={'애플 제품의 적절한 구매시기를 알려드립니다.'}
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
                <th scope="col" className="hidden px-6 py-3 md:table-cell"></th>
                <th scope="col" className="w-1/3 px-3 py-3 md:px-6">
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
              {categories
                .find((category) => category.categoryName === currentCategory.categoryName)
                .categoryData.map(
                  (
                    {
                      name,
                      lastReleaseDate,
                      averageReleaseCycle,
                      price,
                      chartData,
                      imgSrc,
                      itemId,
                    },
                    index
                  ) => (
                    <React.Fragment key={itemId}>
                      <tr
                        onClick={() => toggleRow(itemId)}
                        className={`${
                          expandedRows.includes(itemId) && index ? 'border-t' : ''
                        } cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600`}
                      >
                        <td className="hidden px-6 py-4 md:table-cell">
                          <FontAwesomeIcon
                            icon={expandedRows.includes(itemId) ? faChevronUp : faChevronDown}
                          />
                        </td>
                        <th
                          scope="row"
                          className="flex items-center whitespace-nowrap px-3 py-3 text-gray-900 dark:text-white md:px-6 md:py-4"
                        >
                          <img className="hidden h-10 w-10 md:block" src={imgSrc} alt={name} />
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
                      {expandedRows.includes(itemId) && (
                        <GuideRow name={name} itemId={itemId} imgSrc={imgSrc} />
                      )}
                    </React.Fragment>
                  )
                )}
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
