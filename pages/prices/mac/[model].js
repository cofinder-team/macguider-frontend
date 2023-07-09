import { PageSEO } from '@/components/SEO'
import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import optionsMac from '@/data/options/mac'
import { useState } from 'react'
import useAsync from 'hooks/useAsync'
import { useScreenSize } from 'hooks/useScreenSize'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { pastTime } from '@/lib/utils/pastTime'
import { getPrices } from 'utils/price'
import { getAppleProductInfo } from 'utils/model'
import amplitudeTrack from '@/lib/amplitude/track'
import OptionsModalForMac from '@/components/OptionsModalForMac'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import CoupangLogo from '@/data/coupang_logo.svg'
import { purchaseTiming } from '@/components/guide/GuideBriefRow'
import { useRouter } from 'next/router'
import Feedback from '@/components/Feedback'
import PricesLayout from '@/layouts/PricesLayout'

const MacModel = ({ model, optionId }) => {
  const modalRef = useRef(null)
  const layoutRef = useRef(null)

  useEffect(() => {
    amplitudeTrack('enter_price_detail', { item_class: 'mac', item_detail: model })
  }, [])

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

  const { data: currentItemData, id: currentItemId, releasedDateHistory } = currentItem
  const initialModel = optionId
    ? getAppleProductInfo(currentItemId, Number(optionId), 'mac')
    : currentItemData[0]

  const { sm, md, lg } = useScreenSize()

  // currentItem > currentModel > currentOption
  const [currentModel, setCurrentModel] = useState(initialModel)
  const {
    title: modelTitle,
    specs,
    options,
    imgSrc,
    href,
    isDeprecated,
    releasedDate,
    colors,
  } = currentModel

  const initialOption = optionId
    ? currentModel.options.find((option) => option.id === Number(optionId))
    : currentModel.options[0]
  const [currentOption, setCurrentOption] = useState(initialOption)

  const {
    ram: currentOptionRam,
    ssd: currentOptionSsd,
    id: currentOptionId,
    price: currentOptionPrice,
  } = currentOption
  const [unopened, setUnopened] = useState('false')

  // 가격 조회
  const [state, refetch] = useAsync(getPrices, [currentItemId, options[0].id, unopened], [])
  const { loading, data: fetchedData, error } = state

  const router = useRouter()

  // 가격 데이터 fetch 실패시 alert창 띄우기
  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const getPriceByLevel = useCallback(
    (level) => {
      const price = fetchedData.data.filter((data) => data && data[level]).slice(-1)[0]

      if (price) {
        return price[level]
      }
    },
    [fetchedData]
  )

  const fetchPriceData = useCallback(
    async (itemId, optionId, unopened) => {
      try {
        await refetch([itemId, optionId, unopened])
      } catch (e) {
        console.error(e)
      }
    },
    [refetch]
  )

  const onClickOption = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.setOpen(true)
      modalRef.current.initializeOptions()
    }
  }, [])

  const onClickBuyersGuide = useCallback(() => {
    amplitudeTrack('click_route_buyers_guide', { item_class: 'mac', item_detail: model })
    router.push('/buyers-guide')
  }, [model, router])

  const changeModelOptions = useCallback(
    (optionId) => {
      // find selected Model which contains optionId
      const selectedModel = currentItemData.find((model) =>
        model.options.some((option) => option.id === optionId)
      )

      // find selected Option
      const selectedOption = selectedModel.options.find((option) => option.id === optionId)

      setCurrentModel(selectedModel)
      setCurrentOption(selectedOption)
      fetchPriceData(currentItemId, optionId, unopened)

      amplitudeTrack('click_change_options', {
        item_class: 'mac',
        item_detail: model,
        option_value: selectedModel.specs,
      })
    },
    [currentItemData, currentItemId, model, unopened, fetchPriceData]
  )

  const onInputPlatform = useCallback((platform) => {
    if (platform !== '중고나라') {
      amplitudeTrack('click_change_platform', {
        platform,
      })
      alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')

      // scroll to email form
      if (layoutRef.current) {
        layoutRef.current.scrollToNewsletterForm()
      }
    }
  }, [])

  // 미개봉 상태 변경
  const onInputOptionUnopened = useCallback(
    (status) => {
      setUnopened(status)
      fetchPriceData(currentItemId, currentOptionId, status)

      amplitudeTrack('click_select_option', {
        item_class: 'mac',
        item_detail: model,
        option_type: 'unopened',
        option_value: status,
      })
    },
    [currentOptionId, currentItemId, model, fetchPriceData]
  )

  const getDaysSinceLastReleaseDate = useCallback(() => {
    const today = new Date()
    const [year, month, date] = releasedDateHistory[0].split('-')

    const daysSinceLastReleaseDate = Math.floor(
      (today.getTime() - new Date(year, month - 1, date).getTime()) / (1000 * 60 * 60 * 24)
    )

    return daysSinceLastReleaseDate
  }, [releasedDateHistory])

  const getAverageReleaseCycle = useCallback(() => {
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
  }, [releasedDateHistory])

  const getUsedPurchaseTiming = useCallback(() => {
    if (currentOptionPrice) {
      const latestUsedPrice = fetchedData.data.filter((data) => data.mid).slice(-1)[0]?.mid

      if (latestUsedPrice) {
        const getPriceFitScore = () => (latestUsedPrice / currentOptionPrice) * 100
        const getReleaseDateFitScore = () =>
          (1 - getDaysSinceLastReleaseDate() / getAverageReleaseCycle()) * 100
        const overallFitScore = getPriceFitScore() * 0.6 + getReleaseDateFitScore() * 0.4

        if (overallFitScore >= 61) {
          return purchaseTiming.good
        } else if (overallFitScore >= 40) {
          return purchaseTiming.normal
        } else {
          return purchaseTiming.bad
        }
      }
    }
  }, [fetchedData, getAverageReleaseCycle, getDaysSinceLastReleaseDate])

  const getPurchaseTiming = useCallback(() => {
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
  }, [releasedDateHistory, getAverageReleaseCycle])

  const getCoupangPrice = useCallback(() => {
    if (fetchedData) {
      const coupangPrice = fetchedData.coupang.slice(-1)[0]?.price

      if (coupangPrice) {
        return coupangPrice
      }
    }
  }, [fetchedData])

  const getCoupangLastUpdatedTime = useCallback(() => {
    if (fetchedData) {
      const lastUpdatedTime = fetchedData.time
      const now = new Date()
      const lastUpdated = new Date(lastUpdatedTime)
      const diffTime = Math.abs(now - lastUpdated)
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const diffMinutes = Math.ceil(diffTime / (1000 * 60))

      if (diffDays > 0) {
        return `${diffDays}일 전`
      }

      if (diffMinutes > 60) {
        return `${Math.floor(diffMinutes / 60)}시간 전`
      }

      return `${diffMinutes}분 전`
    }
  }, [fetchedData])

  return (
    <>
      <PageSEO
        title={`맥 시세 | ${specs.year} ${modelTitle}`}
        description={`ChatGPT가 알려주는 사양별 맥 시세 | ${modelTitle}`}
      />

      <OptionsModalForMac
        ref={modalRef}
        currentItem={currentItem}
        currentModel={currentModel}
        currentOption={currentOption}
        onApply={changeModelOptions}
      />

      <PricesLayout
        currentItem={currentItem}
        currentModel={currentModel}
        currentOption={currentOption}
        ref={layoutRef}
      >
        <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-2xl">
          {`${specs.year} ${modelTitle} ${specs.cpuType}`}
        </h1>

        <div className="max-w-xl">
          <div className="mt-6">
            <div className="w-full max-w-md">
              <div
                onClick={onClickOption}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 shadow selection:w-full"
              >
                <div>
                  <h5 className="mb-1  text-sm text-gray-500">옵션선택</h5>

                  <p className="font-semibold text-gray-700 dark:text-gray-400">
                    {`${specs.cpu} / ${specs.gpu} / ${currentOptionSsd} / ${currentOptionRam}`}
                  </p>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center rounded-lg  px-3 py-2 text-center text-sm font-medium text-blue-700"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-md font-bold text-gray-900 dark:text-white">중고 시세</p>

            <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      중고거래 플랫폼
                    </p>
                  </div>
                  <div className="inline-flex w-1/3 items-center text-base font-semibold text-gray-900 dark:text-white">
                    <select
                      id="cpuOptions"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      onInput={(e) => onInputPlatform(e.target.value)}
                      value="중고나라"
                    >
                      <option value="중고나라">중고나라</option>
                      <option value="번개장터">번개장터</option>
                      <option value="당근마켓">당근마켓</option>
                    </select>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      제품 상태
                    </p>
                  </div>
                  <div className="inline-flex w-1/3 items-center text-base font-semibold text-gray-900 dark:text-white">
                    <select
                      id="cpuOptions"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      onInput={(e) => onInputOptionUnopened(e.target.value)}
                      value={unopened}
                    >
                      <option value="true">미개봉</option>
                      <option value="false">S급</option>
                    </select>
                  </div>
                </div>
              </li>
              <li className="bg-gray-100 py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      적정가격
                    </p>
                  </div>
                  <div className="pr-2 text-right text-base font-semibold text-gray-900">
                    {loading || !fetchedData ? (
                      <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                    ) : getPriceByLevel('mid') ? (
                      <>
                        <span>{getPriceByLevel('mid').toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>

                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          <div className="truncate text-xs">
                            <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                            <span className="truncate text-gray-600">{pastTime()}</span>
                          </div>
                        </p>
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
                    <p className="mb-1 truncate text-sm font-medium text-gray-900 dark:text-white">
                      최저가격
                    </p>
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      최고가격
                    </p>
                  </div>

                  <div className="pr-2">
                    <div className="mb-1 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('low') ? (
                        <>
                          <span>{getPriceByLevel('low').toLocaleString()}</span>
                          <span className="ml-1 font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                    <div className="text-right text-sm font-medium text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('high') ? (
                        <>
                          <span>{getPriceByLevel('high').toLocaleString()}</span>
                          <span className="ml-1 font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {
              // 현재 애플스토어에 판매 중인 제품에 대해서만 가이드 표시
              !isDeprecated &&
                (loading || !fetchedData ? (
                  <Skeleton className="max-w-md" height="4rem" borderRadius="0.5rem" />
                ) : (
                  getUsedPurchaseTiming() && (
                    <div
                      onClick={onClickBuyersGuide}
                      className="max-w-md cursor-pointer rounded bg-gray-100  py-3 sm:py-4"
                    >
                      <div className="flex items-center space-x-4 pr-2">
                        <div className="flex-shrink-0"></div>
                        <div className="min-w-0 flex-1 ">
                          <p className="truncate text-sm font-semibold text-gray-900 ">
                            구매시기 가이드
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            지금 중고로 사도 괜찮을까요?
                          </p>
                        </div>
                        <div
                          className="inline-flex cursor-pointer items-center rounded-md  px-2 py-0.5 text-xs font-semibold  text-white"
                          style={{
                            backgroundColor: getUsedPurchaseTiming().color,
                          }}
                        >
                          {getUsedPurchaseTiming().text}
                          <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                        </div>
                      </div>
                    </div>
                  )
                ))
            }
          </div>

          <div className="mt-5">
            <p className="text-md font-bold text-gray-900 dark:text-white">새제품 가격</p>

            <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      애플스토어
                    </p>
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {isDeprecated ? (
                      '단종'
                    ) : (
                      <>
                        <span>{currentOptionPrice.toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>
                      </>
                    )}
                  </div>
                </div>
              </li>

              <li className="py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="w-16 truncate text-sm font-medium text-gray-900 grayscale dark:text-white">
                      <CoupangLogo />
                    </p>
                  </div>
                  <div className="text-right text-base font-semibold text-gray-900">
                    {loading || !fetchedData ? (
                      <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                    ) : getCoupangPrice() ? (
                      <>
                        <span>{getCoupangPrice().toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>

                        <div className="truncate text-xs">
                          <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                          <span className="truncate text-gray-600">
                            {getCoupangLastUpdatedTime()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>품절</span>
                    )}
                  </div>
                </div>
              </li>
            </ul>

            {
              // 현재 애플스토어에 판매 중인 제품에 대해서만 가이드 표시
              !isDeprecated &&
                (loading || !fetchedData ? (
                  <Skeleton className="max-w-md" height="4rem" borderRadius="0.5rem" />
                ) : (
                  getPurchaseTiming() && (
                    <div
                      onClick={onClickBuyersGuide}
                      className="max-w-md cursor-pointer rounded bg-gray-100 py-3 sm:py-4"
                    >
                      <div className="flex items-center space-x-4 pr-2">
                        <div className="flex-shrink-0"></div>
                        <div className="min-w-0 flex-1 ">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            구매시기 가이드
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            지금 새제품을 사도 괜찮을까요?
                          </p>
                        </div>
                        <div
                          className="inline-flex cursor-pointer items-center rounded-md  px-2 py-0.5 text-xs font-semibold  text-white"
                          style={{
                            backgroundColor: getPurchaseTiming().color,
                          }}
                        >
                          {getPurchaseTiming().text}
                          <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                        </div>
                      </div>
                    </div>
                  )
                ))
            }
          </div>

          <div className="mt-5 max-w-md">
            <p className="text-md font-bold text-gray-900 dark:text-white">제품 정보</p>

            <div className="mt-2 flow-root">
              <div className="overflow-x-auto ">
                <div className="inline-block min-w-full align-middle ">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="w-6 px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          출시일
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          색상
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-700">
                          {releasedDate}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-700">
                          {colors.join(', ')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
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
                      data: fetchedData.data.map((price, _index) => (price.mid ? price.mid : null)),
                    },
                  ],
                }}
              />
            )}
          </div>

          {!md && (
            <div className="mt-10 inline-flex w-full items-center justify-center rounded-lg bg-gray-100  p-5 text-base font-medium text-gray-700">
              <Feedback currentItem={currentItem} currentOption={currentOption} />
            </div>
          )}
        </div>
      </PricesLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { model, optionId = null } = context.query

  return {
    props: {
      model,
      optionId,
    },
  }
}

export default MacModel
