import { PageSEO } from '@/components/SEO'
import optionsIpad from '@/data/options/ipad'
import {
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import Link from '@/components/Link'
import { classNames } from 'utils/basic'

export default function Curation({ selected }) {
  const convertToPairs = useCallback((arr) => {
    const result = []
    for (let i = 0; i < arr.length - 1; i += 2) {
      result.push([arr[i], arr[i + 1]])
    }
    return result
  }, [])

  const results = convertToPairs(selected.split(',')).map(([modelId, itemId]) => ({
    modelId: modelId,
    itemId: itemId,
  }))

  const [openDetails, setOpenDetails] = useState(results.map(() => false))

  const findItem = useCallback((modelId, itemId) => {
    const model = optionsIpad.find((m) => m.id === modelId)
    const item = model.data.find((d) => d.options.find((o) => o.id == itemId))
    const option = item.options.find((o) => o.id == itemId)

    return {
      item,
      option,
    }
  }, [])

  const details = results.map(({ modelId, itemId }) => {
    const { item, option } = findItem(modelId, itemId)

    return [
      {
        title: '저장공간',
        value: option.ssd,
        desc:
          option.ssd === '1TB'
            ? '4K 초고화질 영화 100편 정도 담을 수 있어요.'
            : option.ssd === '512GB'
            ? '4K 초고화질 영화 50편, 고사양 게임 10개 정도도 충분해요.'
            : option.ssd === '256GB'
            ? '4K 초고화질 영화 25편, 고사양 게임 5개 정도 담을 수 있어요.'
            : option.ssd === '128GB'
            ? '일상적인 작업에는 전혀 문제 없어요.'
            : '용량이 부족할 수 있으나 클라우드를 활용하고 있다면 충분해요.',
      },
      {
        title: 'CPU',
        value: item.specs.cpu,
        desc:
          item.specs.cpu === 'M2'
            ? '현존하는 태블릿 중 최고의 성능'
            : item.specs.cpu === 'M1'
            ? '여전히 범접할 수 없는 차고 넘치는 성능'
            : item.specs.cpu === 'A14 Bionic' || item.specs.cpu === 'A15 Bionic'
            ? '여전히 차고 넘치는 성능'
            : '일상 작업에는 전혀 문제 없어요.',
      },
      {
        title: '화면 사이즈',
        value: item.size + '인치',
        desc:
          item.size === 12.9
            ? 'A4 용지와 크기가 거의 비슷해요.'
            : item.size === 8.3
            ? '겨울에는 패딩 주머니에 들어가는 극한의 휴대성'
            : item.size === 11
            ? '휴대성과 생산성 모두 챙기고 싶다면...'
            : '들고다니기 정말 좋아요.',
      },
    ]
  })

  const onClickShowDetails = useCallback(
    (index) => {
      setOpenDetails(
        openDetails.map((openDetail, i) => {
          if (i === index) {
            return !openDetail
          } else {
            return openDetail
          }
        })
      )
    },
    [openDetails]
  )

  return (
    <>
      <PageSEO
        title={'개인별 애플 제품 추천'}
        description={'나에게 딱맞는 애플 제품을 추천해드립니다.'}
      />

      <section className="mt-md-6 mx-auto mt-3 max-w-md pb-6">
        <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
          나에게 가장 적합한 아이패드는...
        </h1>

        <div className="space-y-8 divide-y-[1px] divide-gray-200">
          {results.map(({ modelId, itemId }, index) => {
            const { item, option } = findItem(modelId, itemId)

            return (
              <div className="pt-8" key={`${modelId} ${itemId}`}>
                <div className="flex space-x-3">
                  <div className="w-[120px]">
                    <img
                      className="aspect-1 object-contain object-center"
                      src={item.imgSrc}
                      alt={item.title}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-blue-500">{index + 1}위</div>
                    <Link className="cursor-pointer font-semibold text-gray-800" href={item.href}>
                      {`${item.title} ${item.specs.year} (${item.specs.gen}세대)`}
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center">
                      <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {option.ssd}
                      </span>
                      <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {option.connectivity === 'wifi' ? 'Wi-Fi' : 'Wi-Fi + Cellular'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-md bg-gray-100 p-3 text-sm">
                  <div className="font-semibold">MacGuider 두줄평</div>

                  <ul className="mt-2 space-y-2">
                    <li className="space-x-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                      <span>최고의 성능, 최고의 가격</span>
                    </li>
                    <li className="space-x-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                      <span>아이패드로 하는 작업으로 돈을 번다면 추천</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-900">상세정보</div>

                  <div className="relative overflow-hidden">
                    <ul className="mt-2 space-y-2">
                      {details[index]
                        .slice(0, openDetails[index] ? details.length : 2)
                        .map((detail, index) => (
                          <li className="border-b border-gray-100 px-2 pb-2 text-sm" key={index}>
                            <div className="flex items-center justify-between text-gray-900">
                              <div>{detail.title}</div>
                              <div className="font-normal">{detail.value}</div>
                            </div>

                            <p className="mt-1 text-base text-gray-500">{detail.desc}</p>
                          </li>
                        ))}
                    </ul>

                    <div
                      aria-hidden="true"
                      className={classNames(
                        'flex h-2/3 items-center justify-center',
                        openDetails[index]
                          ? 'mt-3'
                          : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-white opacity-90'
                      )}
                    >
                      <span
                        className="relative cursor-pointer text-center text-base text-black"
                        onClick={() => {
                          onClickShowDetails(index)
                        }}
                      >
                        {openDetails[index] ? '상세정보 접기' : '상세정보 더보기'}
                        <FontAwesomeIcon
                          icon={openDetails[index] ? faChevronUp : faChevronDown}
                          className="ml-2"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-3 text-center">
                  <div className="w-1/4 cursor-pointer rounded-lg border border-black bg-white p-4">
                    공유
                  </div>
                  <div className="flex-1 cursor-pointer rounded-lg bg-black p-4 font-bold text-white">
                    중고 120,000원 부터~
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const { selected } = context.query

  return {
    props: {
      selected,
    },
  }
}
