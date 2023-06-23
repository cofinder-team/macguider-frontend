import { PageSEO } from '@/components/SEO'
import React, { useCallback, useEffect } from 'react'

import NewsletterForm from '@/components/NewsletterForm'
import { useState } from 'react'
import Image from 'next/image'
import categories from '@/data/guide/categories'
import amplitude from 'amplitude-js'
import GuideBriefRow from '@/components/guide/GuideBriefRow'
import useAsyncAll from 'hooks/useAsyncAll'
import axiosInstance from '@/lib/axios'

async function getPrices(itemId = 1, optionId = 1, unopened = false) {
  const response = await axiosInstance.get(`/item/${itemId}/option/${optionId}`, {
    params: {
      unopened,
    },
  })
  return response.data
}

export default function BuyersGuide() {
  const [currentCategory, setCurrentCategory] = useState(categories[1])
  const [expandedRows, setExpandedRows] = useState([])

  // 가격 조회
  const [state, refetch] = useAsyncAll(
    getPrices,
    currentCategory.categoryData.map((item) => [item.id, item.data[0].options[0].id, false]),
    [currentCategory]
  )
  const { loading, data: fetchedData, error } = state

  // 가격 데이터 fetch 실패시 alert창 띄우기
  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  useEffect(() => {
    amplitude
      .getInstance()
      .logEvent('page_view', { page_type: 'guide', page_detail: categories[1].categoryName })
  }, [])

  useEffect(() => {
    console.log(fetchedData)
  }, [loading])

  const onClickCategory = (category) => {
    amplitude
      .getInstance()
      .logEvent('page_view', { page_type: 'guide', page_detail: category.categoryName })

    if (category.categoryData.length === 0) {
      alert('아직 준비 중입니다! 이메일을 등록해주시면 가장 먼저 업데이트 소식을 알려드릴게요.')
      return
    }

    setExpandedRows([])
    setCurrentCategory(category)
  }

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
            출시 주기 및 중고거래 데이터를 기반으로 애플 제품의 적절한 구매시기를 알려드립니다.
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
                  새제품 구매
                </th>
                <th scope="col" className="px-3 py-3 md:px-6" style={{ wordBreak: 'keep-all' }}>
                  중고 구매
                </th>
              </tr>
            </thead>
            <tbody>
              {categories
                .find((category) => category.categoryName === currentCategory.categoryName)
                .categoryData.map(
                  ({ id, model, releasedDateHistory, data, desc, href, price }, index) => (
                    <GuideBriefRow
                      key={id}
                      itemId={id}
                      data={data}
                      desc={desc}
                      href={href}
                      model={model}
                      price={price}
                      releasedDateHistory={releasedDateHistory}
                      fetchedData={fetchedData?.find((item) => item.itemId == id)}
                      loading={loading}
                    />
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
