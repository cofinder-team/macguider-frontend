import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { getDeals } from 'utils/deals'
import Banner from '@/components/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import useAsync from 'hooks/useAsync'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from '@/components/Link'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import optionsMac from '@/data/options/mac'
import optionsIpad from '@/data/options/ipad'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import useIntersect from 'hooks/useIntersect'
import React from 'react'
import { classNames } from 'utils/basic'

const filters = [
  {
    id: 'sort',
    name: '정렬',
    options: [
      { value: 'date', label: '최신 순' },
      { value: 'discount', label: '할인 순' },
    ],
    type: 'single',
  },
  {
    id: 'source',
    name: '중고 플랫폼',
    options: [
      { value: 'joongonara', label: '중고나라' },
      { value: 'bunjang', label: '번개장터' },
    ],
    type: 'multiple',
  },
  {
    id: 'model',
    name: '제품',
    options: [
      {
        value: 'default',
        label: '전체',
      },
      ...optionsMac
        .map((option) => ({
          value: option.id,
          label: option.model,
        }))
        .concat(
          optionsIpad.map((option) => ({
            value: option.id,
            label: option.model,
          }))
        ),
    ],
    type: 'single',
  },
]

const initialFilters = filters.map((filter) => ({
  ...filter,
  options: [filter.options[0]],
}))

export default function Deals() {
  const [currentFilters, setCurrentFilters] = useState(initialFilters)

  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date())
  const [visibleLastUpdatedTime, setVisibleLastUpdatedTime] = useState()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loadedPage, setLoadedPage] = useState(1)
  const [currentDeals, setCurrentDeals] = useState([])

  const [state, refetch] = useAsync(getDeals, [], [])
  const { loading, data: deals, error } = state

  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  useEffect(() => {
    if (deals) {
      setCurrentDeals([...currentDeals, ...deals])
    }
  }, [deals])

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)

    setLoadedPage((prev) => prev + 1)
    await refetch([loadedPage + 1, 10])

    observer.observe(entry.target)
  }, {})

  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  useEffect(() => {
    setVisibleLastUpdatedTime('방금 전')

    const interval = setInterval(() => {
      // 1시간 이후 부터
      if (new Date() - lastUpdatedTime > 3600000) {
        setVisibleLastUpdatedTime('업데이트 필요')
      }
      // 1분 이후 부터
      else if (new Date() - lastUpdatedTime > 60000) {
        setVisibleLastUpdatedTime(`${Math.floor((new Date() - lastUpdatedTime) / 60000)}분 전`)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [lastUpdatedTime])

  const onClickMobilePill = useCallback((type) => {
    amplitudeTrack('click_pill', {
      type,
    })
    setMobileFiltersOpen(true)
  }, [])

  const sortBy = useCallback(
    (value) => {
      amplitudeTrack('click_sort_deals_by', {
        sortOption: value,
        sortDirection: 'desc',
      })

      refetch([loadedPage, 10, value, 'desc'])
    },
    [loadedPage, refetch]
  )

  const onChangeFilter = useCallback(
    (sectionId, value) => {
      if (sectionId === 'source') {
        if (value !== 'joongonara') {
          alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')
          return
        }
      } else if (sectionId === 'sort') {
        sortBy(value)
      }

      setCurrentFilters(
        currentFilters.map((filter) => {
          if (filter.id === sectionId) {
            return {
              ...filter,
              options: [
                filters
                  .find((f) => f.id === sectionId)
                  .options.find((option) => option.value === value),
              ],
            }
          } else {
            return filter
          }
        })
      )
    },
    [currentFilters]
  )

  const onClickDealCard = useCallback((dealId) => {
    amplitudeTrack('click_deal_card', {
      dealId,
    })
  }, [])

  const fetchDeals = useCallback(() => {
    refetch()
    setLastUpdatedTime(new Date())
  }, [refetch])

  const onClickHandleReload = useCallback(async () => {
    amplitudeTrack('click_reload_deals')

    try {
      fetchDeals()
    } catch (error) {
      console.error('Error fetching deals:', error)
    }
  }, [fetchDeals])

  const getDiscountPercentage = useCallback((price, avgPrice) => {
    return Math.round((1 - price / avgPrice) * 100)
  }, [])

  return (
    <>
      <PageSEO title={`중고 핫딜`} description={`매일 중고 꿀매를 대신 찾아드립니다`} />
      <h1 className="text-2xl font-bold">중고 Apple 제품 보물찾기 &#128142;</h1>

      <div className="mt-4 flex items-center space-x-2 overflow-x-auto scrollbar-hide lg:hidden">
        {currentFilters.map((filter) => (
          <div
            className="relative flex-shrink-0 text-left"
            onClick={() => {
              onClickMobilePill(filter.id)
            }}
            key={filter.id}
          >
            <div className="font-base inline-flex w-full items-center justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {filter.options[0].label}
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm font-medium ">
        <div className="-mx-4 flex items-center justify-between bg-gray-100 px-4 py-2 text-gray-600 lg:py-4">
          <div>평균 중고 시세보다&nbsp; 저렴한 제품들이에요</div>

          <div className="flex cursor-pointer items-center " onClick={onClickHandleReload}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="inlin-block ml-1">{visibleLastUpdatedTime}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 md:pt-6 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">필터</h2>

          {/* PC 필터 */}
          <div className="hidden lg:block">
            <form className="space-y-10 divide-y divide-gray-200">
              {filters.map((section, sectionIdx) => (
                <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">
                      {section.name}
                    </legend>
                    <div className="space-y-3 pt-6">
                      {section.type === 'multiple' ? (
                        section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={() => {
                                onChangeFilter(section.id, option.value)
                              }}
                              checked={
                                currentFilters.find(
                                  (filter) =>
                                    filter.id === section.id &&
                                    filter.options.find(
                                      (currentOption) => currentOption.value === option.value
                                    )
                                ) || false
                              }
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))
                      ) : (
                        <ul className="space-y-4 px-3">
                          {section.options.map((option, optionIdx) => (
                            <li
                              key={option.value}
                              className={classNames(
                                currentFilters.find(
                                  (filter) =>
                                    filter.id === section.id &&
                                    filter.options.find(
                                      (currentOption) => currentOption.value === option.value
                                    )
                                )
                                  ? 'font-semibold text-gray-900'
                                  : 'text-gray-500',
                                'flex items-center text-sm'
                              )}
                              onClick={() => {
                                onChangeFilter(section.id, option.value)
                              }}
                            >
                              {option.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </fieldset>
                </div>
              ))}
            </form>
          </div>
        </aside>

        {/* 핫딜 제품들 */}
        <div className="md:mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
          <div className="mt-2 grid grid-cols-1 lg:mt-0 xl:grid-cols-2 xl:gap-x-16 xl:gap-y-4">
            {loading && currentDeals.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div className="flex h-[120px] items-center" key={index}>
                    <div className="mr-2 flex-1">
                      <h3>
                        <Skeleton />
                      </h3>
                      <p className="mb-0">
                        <Skeleton count={2} />
                      </p>
                    </div>
                    <div className="aspect-1 w-1/4 max-w-[100px] ">
                      <Skeleton height="100%" />
                    </div>
                  </div>
                ))
              : currentDeals.map(({ id, source, price, sold, unused, url, item, average }) => (
                  <Link
                    href={`/deals/${id}`}
                    onClick={() => {
                      onClickDealCard(id)
                    }}
                    className="flex h-[120px] w-full cursor-pointer items-center overflow-hidden  bg-white"
                    key={id}
                  >
                    <div className="mr-2 flex-1 truncate">
                      <div className="mt-1 truncate  text-base  font-medium tracking-tight text-gray-600">
                        <span className="mr-1 inline-block font-semibold">
                          {unused ? (
                            <span className="text-blue-500">미개봉</span>
                          ) : (
                            <span className="text-green-500">S급</span>
                          )}
                        </span>
                        {item.type === 'M'
                          ? `${item.model.name} ${item.details.chip}`
                          : `${item.model.name} ${item.details.gen}세대`}
                      </div>
                      <div className="truncate text-xs font-normal text-gray-500">
                        <span className="mr-1 inline-block  font-semibold text-gray-700">
                          {source}
                        </span>
                        {item.type === 'M'
                          ? `CPU ${item.details.cpu} GPU ${item.details.gpu}, RAM ${item.details.ram}GB, SSD ${item.details.ssd}`
                          : `${item.details.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'} (${
                              item.details.storage
                            })`}
                      </div>

                      <div className=" flex items-center text-lg">
                        <div className="font-bold text-gray-900">{price?.toLocaleString()}원</div>
                      </div>

                      {average && (
                        <div className="text-xs  text-gray-500">
                          <span className="font-semibold text-blue-500">
                            {getDiscountPercentage(price, average)}%&nbsp;
                          </span>
                          <span>평균&nbsp;</span>
                          {average?.toLocaleString()}원
                        </div>
                      )}
                    </div>

                    <div className="flex h-full w-1/4 max-w-[100px] items-center">
                      <div className="relative aspect-1 overflow-hidden rounded-md">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL_V2}/deal/${id}/image`}
                          alt={`${item.model.name} 썸네일`}
                          className="h-full w-full object-cover object-center"
                        />

                        {sold && (
                          <div className="absolute top-0  left-0 flex h-full w-full items-center justify-center text-sm font-bold text-white ">
                            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40" />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                              판매완료
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
      {!loading && currentDeals.length > 0 && (
        // <div className="md:mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3" re4f>
        //   <div className="mt-2 grid grid-cols-1 lg:mt-0 xl:grid-cols-2 xl:gap-x-16 xl:gap-y-4">
        //     {Array.from({ length: 4 }).map((_, index) => (
        //       <div className="flex h-[120px] items-center" key={index}>
        //         <div className="mr-2 flex-1">
        //           <h3>
        //             <Skeleton />
        //           </h3>
        //           <p className="mb-0">
        //             <Skeleton count={2} />
        //           </p>
        //         </div>
        //         <div className="aspect-1 w-1/4 max-w-[100px] ">
        //           <Skeleton height="100%" />
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        // </div>
        <div role="status" className="mt-5 flex justify-center" ref={setRef}>
          <svg
            aria-hidden="true"
            className="mr-2 inline h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <Banner />
      {/* Mobile 모달 */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full  flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900"></h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form className="mt-4">
                  {filters.map((section) => (
                    <div as="div" key={section.name} className="border-t border-gray-200 pb-4 pt-4">
                      <fieldset>
                        <legend className="w-full px-2">
                          <div className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              {section.name}
                            </span>
                          </div>
                        </legend>
                        <div className="px-4 pb-2 pt-4">
                          {section.type === 'multiple' ? (
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    checked={
                                      currentFilters.find(
                                        (filter) =>
                                          filter.id === section.id &&
                                          filter.options.find(
                                            (currentOption) => currentOption.value === option.value
                                          )
                                      ) || false
                                    }
                                    onChange={() => {
                                      onChangeFilter(section.id, option.value)
                                    }}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-4 px-3">
                              {section.options.map((option, optionIdx) => (
                                <li
                                  key={option.value}
                                  className={classNames(
                                    currentFilters.find(
                                      (filter) =>
                                        filter.id === section.id &&
                                        filter.options.find(
                                          (currentOption) => currentOption.value === option.value
                                        )
                                    )
                                      ? 'font-semibold text-gray-900'
                                      : 'text-gray-500',
                                    'flex items-center text-sm'
                                  )}
                                  onClick={() => {
                                    onChangeFilter(section.id, option.value)
                                  }}
                                >
                                  {option.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
