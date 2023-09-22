import { PageSEO } from '@/components/SEO'
import React, { useCallback, useEffect } from 'react'

import NewsletterForm from '@/components/NewsletterForm'
import { useState } from 'react'
import { Category, categories } from '@/data/guide/categories'
import GuideBriefRow from '@/components/guide/GuideBriefRow'
import Promo from '@/components/Promo'
import amplitudeTrack from '@/lib/amplitude/track'
import { getModels } from 'utils/model'

export default function BuyersGuide() {
  const [currentCategory, setCurrentCategory] = useState<Category>(categories[1])
  const [models, setModels] = useState<MainItemResponse[]>([])

  useEffect(() => {
    if (!currentCategory.code) return

    getModels(currentCategory.code)
      .then((res) => {
        setModels(res)
      })
      .catch(() => {
        alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
      })
  }, [currentCategory])

  useEffect(() => {
    amplitudeTrack('enter_guide')
  }, [])

  const onClickCategory = useCallback((category) => {
    amplitudeTrack('click_select_category', { category: category.name })

    if (!category.code) {
      alert('아직 준비 중입니다! 이메일을 등록해주시면 가장 먼저 업데이트 소식을 알려드릴게요.')
      return
    }

    setCurrentCategory(category)
  }, [])

  return (
    <>
      <PageSEO
        title={'애플 제품 구매 가이드'}
        description={'지금 사도 괜찮을까? 애플 제품의 적절한 구매시기를 알려드립니다.'}
      />

      <Promo
        title="나에게 딱 맞는 iPad 찾기"
        desc="예산과 용도에 맞는 iPad를 추천해드립니다."
        href="/curation"
        imgSrc="https://static.waveon.io/img/apps/18146/아이패드-큐레이션-광고_복사본-_1_-001.jpg"
        cta="추천받기"
      />

      <section className="mt-md-6 mt-3 pb-6">
        <div className="space-y-2 pb-2 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            애플 제품 구매 가이드
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            출시 주기 및 중고거래 데이터를 기반으로 애플 제품의 적절한 구매시기를 알려드립니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center pb-2 pt-4">
          {categories.map((category) => (
            <button
              onClick={() => {
                onClickCategory(category)
              }}
              key={category.name}
              type="button"
              className={`${
                currentCategory.name === category.name ? 'border-blue-600' : 'border-white'
              } ${
                category.code ? 'text-blue-700' : 'text-gray-300'
              } mb-3 mr-3 rounded-full border  bg-white px-5 py-2.5 text-center text-base font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:bg-gray-900 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800`}
            >
              {category.name}
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
              {models &&
                models.map(
                  (model) =>
                    model.histories.length >= 2 && (
                      <GuideBriefRow key={model.mainItem.id} model={model} />
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
