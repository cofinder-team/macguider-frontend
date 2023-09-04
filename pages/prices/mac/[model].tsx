import { PageSEO } from '@/components/SEO'
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react'
// import { Line } from 'react-chartjs-2'
import optionsMac from '@/data/options/mac'
import { useState } from 'react'
import { useScreenSize } from 'hooks/useScreenSize'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { pastTime } from '@/lib/utils/pastTime'
import { Source } from 'utils/price'
import {
  getRecentCoupangPrice,
  getTotalCoupangPrice,
  getTotalRegularPrice,
  getTotalTradePrice,
} from 'utils/price'
import { getAppleProductInfo } from 'utils/model'
import amplitudeTrack from '@/lib/amplitude/track'
import OptionsModalForMac from '@/components/OptionsModalForMac'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CoupangLogo from '@/data/coupang_logo.svg'
import { purchaseTiming } from '@/components/guide/GuideBriefRow'
import { useRouter } from 'next/router'
import Feedback from '@/components/Feedback'
import PricesLayout from '@/layouts/PricesLayout'
import { useQuery } from 'react-query'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface PageProps {
  model: string
  optionId: string | null
}

const MacModel = ({ model, optionId }: PageProps) => {
  const modalRef = useRef(null) as any
  const layoutRef = useRef(null) as any

  const { md } = useScreenSize()
  const router = useRouter()

  useEffect(() => {
    amplitudeTrack('enter_price_detail', { item_class: 'mac', item_detail: model })
  }, [])

  let currentModel: MacModel

  switch (model) {
    case 'mac-mini':
      currentModel = optionsMac.find((m) => m.id === '1') as MacModel
      break
    case 'macbook-air-13':
      currentModel = optionsMac.find((m) => m.id === '2') as MacModel
      break
    case 'macbook-pro-13':
      currentModel = optionsMac.find((m) => m.id === '3') as MacModel
      break
    case 'macbook-pro-14':
      currentModel = optionsMac.find((m) => m.id === '4') as MacModel
      break
    case 'macbook-pro-16':
      currentModel = optionsMac.find((m) => m.id === '5') as MacModel
      break
    default:
      currentModel = optionsMac.find((m) => m.id === '1') as MacModel
  }

  const { data: currentModelData, id: currentModelId, releasedDateHistory } = currentModel
  const initialItem: MacItem = optionId
    ? (getAppleProductInfo(currentModelId, Number(optionId), 'M') as MacItem)
    : currentModelData[0]

  // currentModel > currentItem > currentOption
  const [currentItem, setCurrentItem] = useState(initialItem)
  const { title: modelTitle, specs, isDeprecated, releasedDate, colors } = currentItem

  const initialOption = (
    optionId
      ? currentItem?.options.find((option) => option.id === Number(optionId))
      : currentItem?.options[0]
  ) as MacItemDetails
  const [currentOption, setCurrentOption] = useState(initialOption)

  const {
    ram: currentOptionRam,
    ssd: currentOptionSsd,
    id: currentOptionId,
    price: currentOptionPrice,
  } = currentOption

  // const [unopened, setUnopened] = useState('false')
  const [unused, setUnused] = useState(false)
  const [source, setSource] = useState<Source>('중고나라')

  // 전체 시세 조회
  const {
    isLoading: loadingTotalPrice,
    error: errorTotalPrice,
    data: totalPriceData,
  } = useQuery(['totalPrice', 'M', currentOptionId, currentItem, unused, source], () =>
    getTotalTradePrice('M', currentOptionId, unused, source)
  )

  // 현재 쿠팡 가격 조회
  const {
    isLoading: loadingRecentCoupangPrice,
    error: errorRecentCoupangPrice,
    data: recentCoupangPriceData,
  } = useQuery(['recentCoupangPrice', currentModel.id, currentOptionId], () =>
    getRecentCoupangPrice('M', currentOptionId)
  )

  // 전체 쿠팡 가격 조회
  const {
    isLoading: loadingTotalCoupangPrice,
    error: errorTotalCoupangPrice,
    data: totalCoupangPriceData,
  } = useQuery(['totalCoupangPrice', currentModel.id, currentOptionId], () =>
    getTotalCoupangPrice('M', currentOptionId)
  )

  // 전체 정가 조회
  const {
    isLoading: loadingTotalRegularPrice,
    error: errorTotalRegularPrice,
    data: totalRegularPriceData,
  } = useQuery(['totalRegularPrice', currentModel.id, currentOptionId], () =>
    getTotalRegularPrice('M', currentOptionId)
  )

  const loading =
    loadingTotalPrice ||
    loadingRecentCoupangPrice ||
    loadingTotalCoupangPrice ||
    loadingTotalRegularPrice

  // 가격 데이터 fetch 실패시 alert창 띄우기
  if (
    errorTotalPrice ||
    errorRecentCoupangPrice ||
    errorTotalCoupangPrice ||
    errorTotalRegularPrice
  ) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const getPriceByLevel = useCallback(
    (level: 'average' | 'price_20' | 'price_80') => {
      if (totalPriceData) {
        const price = totalPriceData.filter((data) => data[level]).slice(-1)[0]

        return price[level]
      } else {
        return null
      }
    },
    [totalPriceData]
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
      const selectedItem = currentModelData.find((model) =>
        model.options.some((option) => option.id === optionId)
      )

      if (selectedItem) {
        // find selected Option
        const selectedOption = selectedItem.options.find(
          (option) => option.id === optionId
        ) as MacItemDetails

        setCurrentItem(selectedItem)
        setCurrentOption(selectedOption)
        // fetchPriceData(currentItemId, optionId, unopened)

        amplitudeTrack('click_change_options', {
          item_class: 'mac',
          item_detail: model,
          option_value: selectedItem.specs,
        })
      }
    },
    [currentModelData, model]
  )

  const onInputPlatform = useCallback((platform: Source) => {
    amplitudeTrack('click_change_platform', {
      platform,
    })

    if (platform === '당근마켓') {
      alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')
      return
    }

    setSource(platform)

    // scroll to email form
    if (layoutRef.current) {
      layoutRef.current.scrollToNewsletterForm()
    }
  }, [])

  // 미개봉 상태 변경
  const onInputOptionUnused = useCallback(
    (status: boolean) => {
      setUnused(status)

      // fetchPriceData(currentItemId, currentOptionId, status)

      amplitudeTrack('click_select_option', {
        item_class: 'mac',
        item_detail: model,
        option_type: 'unopened',
        option_value: status,
      })
    },
    [model]
  )

  const daysSinceLastReleaseDate = useMemo(() => {
    const today = new Date()
    const [year, month, date] = releasedDateHistory[0].split('-')

    const daysSinceLastReleaseDate = Math.floor(
      (today.getTime() - new Date(Number(year), Number(month) - 1, Number(date)).getTime()) /
        (1000 * 60 * 60 * 24)
    )

    return daysSinceLastReleaseDate
  }, [releasedDateHistory])

  const averageReleaseCycle = useMemo(() => {
    const releaseCycles: number[] = []
    for (let i = 0; i < releasedDateHistory.length - 1; i++) {
      // convert YYYY-MM-DD string to Date object
      const prev = releasedDateHistory[i].split('-')
      const next = releasedDateHistory[i + 1].split('-')

      const date1 = new Date(Number(prev[0]), Number(prev[1]) - 1, Number(prev[2]))
      const date2 = new Date(Number(next[0]), Number(next[1]) - 1, Number(next[2]))
      const diffTime = Math.abs(date2.getTime() - date1.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      releaseCycles.push(diffDays)
    }

    const averageReleaseCycle = Math.round(
      releaseCycles.reduce((a, b) => a + b, 0) / releaseCycles.length
    )

    return averageReleaseCycle
  }, [releasedDateHistory])

  const usedPurchaseTiming = useMemo(() => {
    if (totalPriceData) {
      const latestUsedPrice = totalPriceData.filter((data) => data.average).slice(-1)[0].average

      if (latestUsedPrice && currentOptionPrice) {
        const getPriceFitScore = () => (latestUsedPrice / currentOptionPrice) * 100
        const getReleaseDateFitScore = () =>
          (1 - daysSinceLastReleaseDate / averageReleaseCycle) * 100
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
  }, [totalPriceData, currentOptionPrice, daysSinceLastReleaseDate, averageReleaseCycle])

  const newPurchaseTiming = useMemo(() => {
    const latestReleaseDate = releasedDateHistory[0]

    const today = new Date()
    const [year, month, day] = latestReleaseDate.split('-')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    const diffTime = Math.abs(today.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > averageReleaseCycle * 0.85) {
      return purchaseTiming.bad
    } else if (diffDays > averageReleaseCycle * 0.6) {
      return purchaseTiming.normal
    } else {
      return purchaseTiming.good
    }
  }, [releasedDateHistory, averageReleaseCycle])

  const recentCoupangPrice = useMemo(() => {
    if (totalCoupangPriceData) {
      const recentData = totalCoupangPriceData.slice(-1)[0]

      if (recentData.price) {
        return recentData.price
      } else {
        return null
      }
    } else {
      return null
    }
  }, [totalCoupangPriceData])

  const coupangLastUpdatedTime = useMemo(() => {
    if (totalCoupangPriceData) {
      const recentData = totalCoupangPriceData.slice(-1)[0]

      const lastUpdatedTime = recentData.date
      const now = new Date()
      const lastUpdated = new Date(lastUpdatedTime)
      const diffTime = Math.abs(now.getTime() - lastUpdated.getTime())
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
  }, [totalCoupangPriceData])

  return (
    <>
      <PageSEO
        title={`맥 시세 | ${specs.year} ${modelTitle}`}
        description={`ChatGPT가 알려주는 사양별 맥 시세 | ${modelTitle}`}
      />

      <OptionsModalForMac
        ref={modalRef}
        currentModel={currentModel}
        currentItem={currentItem}
        currentOption={currentOption}
        onApply={changeModelOptions}
      />

      <PricesLayout
        currentModel={currentModel}
        currentItem={currentItem}
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
                      onInput={(e: ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value as Source
                        onInputPlatform(value)
                      }}
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
                      onInput={(e: ChangeEvent<HTMLSelectElement>) => {
                        const value = Boolean(e.target.value)
                        onInputOptionUnused(value)
                      }}
                      value={unused.toString()}
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
                    {loading ? (
                      <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                    ) : getPriceByLevel('average') ? (
                      <>
                        <span>{getPriceByLevel('average')?.toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>

                        <div className="truncate text-sm text-gray-500 dark:text-gray-400">
                          <div className="truncate text-xs">
                            <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                            <span className="truncate text-gray-600">{pastTime()}</span>
                          </div>
                        </div>
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
                      {loading ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('average') ? (
                        <>
                          <span>{getPriceByLevel('average')?.toLocaleString()}</span>
                          <span className="ml-1 font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                    <div className="text-right text-sm font-medium text-gray-900 dark:text-white">
                      {loading ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('price_80') ? (
                        <>
                          <span>{getPriceByLevel('price_80')?.toLocaleString()}</span>
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
                (loading ? (
                  <Skeleton className="max-w-md" height="4rem" borderRadius="0.5rem" />
                ) : (
                  usedPurchaseTiming && (
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
                            backgroundColor: usedPurchaseTiming.color,
                          }}
                        >
                          {usedPurchaseTiming.text}
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
                        <span>{currentOptionPrice?.toLocaleString()}</span>
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
                    {loading ? (
                      <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                    ) : recentCoupangPrice ? (
                      <>
                        <span>{recentCoupangPrice.toLocaleString()}</span>
                        <span className="ml-1 font-normal">원</span>

                        <div className="truncate text-xs">
                          <span className="text-gray-500">마지막 업데이트: &nbsp;</span>
                          <span className="truncate text-gray-600">{coupangLastUpdatedTime}</span>
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
                (loading ? (
                  <Skeleton className="max-w-md" height="4rem" borderRadius="0.5rem" />
                ) : (
                  purchaseTiming && (
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
                            backgroundColor: purchaseTiming.color,
                          }}
                        >
                          {newPurchaseTiming.text}
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

          {/* <div className="mt-5">
            <p className="text-md font-bold text-gray-900 dark:text-white">가격 그래프</p>

            {loading ? (
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
          </div> */}

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
