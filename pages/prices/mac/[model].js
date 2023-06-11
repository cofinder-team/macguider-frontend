import { PageSEO } from '@/components/SEO'
import React, { useEffect } from 'react'

import Image from 'next/image'

import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import optionsMac from '@/data/options/mac'
import { useState } from 'react'
import axiosInstance from '@/lib/axios'
import useAsync from 'hooks/useAsync'
import { useScreenSize } from 'hooks/useScreenSize'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import amplitude from 'amplitude-js'
import NewsletterForm from '@/components/NewsletterForm'

async function getPrices(itemId = 1, optionId = 1, unopened = false) {
  const response = await axiosInstance.get(`/item/${itemId}/option/${optionId}`, {
    params: {
      unopened,
    },
  })
  return response.data
}

const MacModel = ({ model }) => {
  useEffect(() => {
    amplitude.getInstance().logEvent('item_view', { item_class: 'ipad', item_detail: model })
  }, [model])

  let currentItem = null

  switch (model) {
    case 'mac-mini':
      currentItem = optionsMac.find((m) => m.id === '1')
      break
    case 'macbook-air-13':
      currentItem = optionsMac.find((m) => m.id === '2')
      break
    case 'macbook-pro-13':
      currentItem = optionsMac.find((m) => m.id === '3')
      break
    case 'macbook-pro-14':
      currentItem = optionsMac.find((m) => m.id === '4')
      break
    case 'macbook-pro-16':
      currentItem = optionsMac.find((m) => m.id === '5')
      break
    default:
      currentItem = optionsMac.find((m) => m.id === '1')
  }

  const { data: currentItemData, id: currentItemId } = currentItem

  // currentItem > currentModel > currentOption
  const [currentModel, setCurrentModel] = useState(currentItemData[0])

  const { title: modelTitle, specs, options, imgSrc, href } = currentModel
  const [currentOption, setCurrentOption] = useState(options[0])
  const { ram, ssd } = currentOption
  const [unopened, setUnopened] = useState('false')

  // media query
  const { md } = useScreenSize()

  // 가격 조회
  const [state, refetch] = useAsync(getPrices, [currentItemId, 1, unopened], [])
  const { loading, data: fetchedData, error } = state

  // 가격 데이터 fetch 실패시 alert창 띄우기
  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const getPriceByLevel = (level) => {
    const price = fetchedData.data.slice(-1)[0][level]
    return price
  }

  const fetchPriceData = async (itemId, optionId, unopened) => {
    try {
      await refetch([itemId, optionId, unopened])
    } catch (e) {
      console.error(e)
    }
  }

  const onInputOptionCPU = (optionIndex) => {
    const selectedModel = currentItemData[optionIndex]
    const defaultOption = selectedModel.options[0]

    // cpu에 맞는 모델로 변경
    setCurrentModel(selectedModel)

    // 옵션 초기화
    setCurrentOption(defaultOption)

    // 가격 조회
    fetchPriceData(currentItemId, defaultOption.id, unopened)

    amplitude.getInstance().logEvent('select_option', {
      item_class: 'mac',
      item_detail: model,
      option_type: 'cpu',
      option_value: selectedModel.specs,
    })
  }

  // 미개봉 상태 변경
  const onInputOptionUnopened = (status) => {
    setUnopened(status)
    fetchPriceData(currentItemId, currentOption.id, status)

    amplitude.getInstance().logEvent('select_option', {
      item_class: 'mac',
      item_detail: model,
      option_type: 'unopened',
      option_value: status,
    })
  }

  const onChangeOption = async (optionId) => {
    // ram, ssd에 맞는 모델로 변경
    const option = options.find((option) => option.id === optionId)
    setCurrentOption(option)

    // 가격 조회
    await fetchPriceData(currentItemId, optionId, unopened)

    amplitude.getInstance().logEvent('select_option', {
      item_class: 'mac',
      item_detail: model,
      option_type: 'detail',
      option_value: option,
    })
  }

  return (
    <>
      <PageSEO
        title={`맥 시세 | ${specs.year} ${modelTitle}`}
        description={`ChatGPT가 알려주는 사양별 맥 시세 | ${modelTitle}`}
      />

      <div className="container md:py-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <Image
              alt={`${specs.year} ${modelTitle} 이미지`}
              src={imgSrc}
              className="object-contain object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />

            <ul className="mt-2 mb-8 space-y-1 text-left text-gray-500 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  마지막 업데이트:{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">7일전</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  데이터 수집:{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">중고나라</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span className="font-semibold text-gray-900 dark:text-white">업자글 제외</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    끌어올린글 제외
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex-grow md:px-3">
            <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-2xl">
              {modelTitle} ({`${ram}, SSD ${ssd}`})
            </h1>

            <div className="max-w-xl">
              <ul className="mt-6 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        적정가격
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        평균적으로 거래되는 가격
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('mid') ? (
                        <>
                          <span>{getPriceByLevel('mid').toLocaleString()}</span>
                          <span className="ml-1 block font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  </div>
                </li>

                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        최저가격
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        평균보다 낮은 가격
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('low') ? (
                        <>
                          <span>{getPriceByLevel('low').toLocaleString()}</span>
                          <span className="ml-1 block font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  </div>
                </li>

                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        최고가격
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        평균보다 높은 가격
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('high') ? (
                        <>
                          <span>{getPriceByLevel('high').toLocaleString()}</span>
                          <span className="ml-1 block font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-3">
                <div className="w-full max-w-md">
                  <label
                    htmlFor="cpuOptions"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CPU
                  </label>
                  <select
                    id="cpuOptions"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onInput={(e) => onInputOptionCPU(e.target.value)}
                    value={currentItemData.indexOf(currentModel)}
                  >
                    {currentItemData.map((model, index) => (
                      <option key={model.specs.cpu} value={index}>
                        {model.specs.cpu} ({model.specs.year})
                      </option>
                    ))}
                  </select>
                </div>

                <ul className="mt-3 flex w-full  max-w-xl flex-wrap items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  {options.map((option) => (
                    <li
                      key={option.id}
                      className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0  md:w-1/2"
                    >
                      <div className="flex items-center pl-3">
                        <input
                          onChange={() => {
                            onChangeOption(option.id)
                          }}
                          id={option.id}
                          checked={currentOption === option}
                          type="radio"
                          value=""
                          name="list-radio"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {`RAM ${option.ram}, SSD ${option.ssd}`}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="grid max-w-md grid-cols-2 gap-2 py-5">
                  <div className="w-full">
                    <label
                      htmlFor="optionUnopened"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      제품 상태
                    </label>
                    <select
                      id="optionUnopened"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      onInput={(e) => onInputOptionUnopened(e.target.value)}
                      value={unopened}
                    >
                      <option value="true">미개봉</option>
                      <option value="false">S급 (생활기스 수준, 풀구성)</option>
                      <option disabled value="false">
                        A급 (준비중)
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="optionAppleCare"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Apple Care +
                    </label>
                    <select
                      id="optionAppleCare"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="없음">없음</option>
                      <option disabled value="S급">
                        1년 이상 남음 (준비중)
                      </option>
                      <option disabled value="S급">
                        2년 이상 남음 (준비중)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-md font-bold text-gray-900 dark:text-white">가격 그래프</p>

                {loading || !fetchedData ? (
                  <Skeleton className="mt-3" height={md ? '15rem' : '8rem'} />
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
                          data: fetchedData.data.map((price, _index) =>
                            price.mid ? price.mid : null
                          ),
                        },
                      ],
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { model } = context.query

  return {
    props: {
      model,
    },
  }
}

export default MacModel
