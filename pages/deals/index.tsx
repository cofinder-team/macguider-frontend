import { PageSEO } from '@/components/SEO'
import { useCallback, useEffect, useMemo, useState } from 'react'
import amplitudeTrack from '@/lib/amplitude/track'
import { getDeals } from 'utils/deals'
import HotdealBanner from '@/components/HotdealBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useIntersect from 'hooks/useIntersect'
import React from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import DealCard from '@/components/deals/DealCard'
import AdDealCard from '@/components/deals/AdDealCard'
import { useRouter } from 'next/router'
import { getModels } from 'utils/model'

const maxPage = 10

const fetchDeals = async ({ pageParam = 1, sortOption, modelType, modelId, source }) => {
  return await getDeals(pageParam, 10, sortOption, 'desc', modelType, modelId, source)
}

const adDeals = [
  {
    id: 1,
    item: {
      type: 'M',
      model: {
        id: 2,
        name: 'MacBook Air 13',
        option: 1,
      },
      details: {
        chip: 'M1',
        cpu: 8,
        gpu: 7,
        ram: 8,
        ssd: '256GB',
      },
    },
    price: 750000,
    sold: false,
    unused: false,
    source: '맥가이더',
    imgSrc: 'https://static.waveon.io/img/apps/18146/398C7B91-E6EC-4662-8CF8-3ADA47ED4122.jpg',
    average: 1000000,
    url: 'https://tally.so/r/mK5zoD',
  },
]

interface Props {
  model: string | null
  source: Source | null
  sort: 'date' | 'discount' | null
}

interface Filter {
  id: 'sort' | 'source' | 'model'
  name: string
  options: {
    value: unknown
    label: string
  }[]
  type: 'single' | 'multiple'
}

export default function Deals({ model, source: sourceOption, sort }: Props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const sortOption = sort || 'date'
  const modelType: ModelType | null = (model?.split(',')[0] as ModelType) || null
  const modelId: number | null = Number(model?.split(',')[1]) || null
  const source = sourceOption || null
  const {
    isLoading: loadingModels,
    error: errorModels,
    data: models,
  } = useQuery(['models'], () => getModels())

  const filters: Filter[] = useMemo(
    () => [
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
          { value: '', label: '전체' },
          { value: '중고나라', label: '중고나라' },
          { value: '번개장터', label: '번개장터' },
        ],
        type: 'single',
      },
      {
        id: 'model',
        name: '제품',
        options: [
          {
            value: [],
            label: '전체',
          },
          ...(models || []).map((model) => ({
            value: [model.type, model.id],
            label: model.name,
          })),
        ],
        type: 'single',
      },
    ],
    [models]
  )

  const currentFilters = useMemo(() => {
    if (!models) return []

    return filters.map((filter) => ({
      ...filter,
      options:
        filter.id === 'sort'
          ? [filter.options.find((option) => option.value === sortOption) || filter.options[0]]
          : filter.id === 'model'
          ? [
              filter.options.find((option) => (option.value as number[])[1] === modelId) ||
                filter.options[0],
            ]
          : filter.id === 'source'
          ? [filter.options.find((option) => option.value === (source || '')) || filter.options[0]]
          : [filter.options[0]],
    }))
  }, [sortOption, modelId, source, models, filters])

  const router = useRouter()

  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  const {
    status,
    data: deals,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['deals', sortOption, modelType, modelId, source],
    (params) =>
      fetchDeals({
        ...params,
        sortOption,
        modelType,
        modelId,
        source,
      }),
    {
      staleTime: 30000,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.length < maxPage ? undefined : pages.length + 1,
      refetchOnMount: false,
    }
  )

  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const [_, setRef] = useIntersect(async (entry, observer) => {
    if (!deals) return
    observer.unobserve(entry.target)

    amplitudeTrack('scroll_load_more_deals', {
      page: deals.pages.length + 1,
    })
    fetchNextPage()
    observer.observe(entry.target)
  }, {})

  const onClickMobilePill = useCallback((type) => {
    amplitudeTrack('click_mobile_pill', {
      type,
    })
    setMobileFiltersOpen(true)
  }, [])

  const onChangeFilter = useCallback(
    (sectionId, value) => {
      amplitudeTrack('change_filter', {
        sectionId,
        value: Array.isArray(value) ? value.join(' ') : value,
      })

      const newQuery = {
        ...router.query,
        [sectionId]: Array.isArray(value) ? value.join(',') : value,
      }

      if ((sectionId === 'source' && !value) || (sectionId === 'model' && value.length === 0)) {
        delete newQuery[sectionId]
      }

      router.push({
        pathname: '/deals',
        query: newQuery,
      })
    },
    [router]
  )

  const onClickHandleReload = useCallback(async () => {
    amplitudeTrack('click_reload_deals')

    try {
      refetch()
    } catch (error) {
      console.error('Error fetching deals:', error)
    }
  }, [refetch])

  const onClickDealCard = useCallback((dealId) => {
    amplitudeTrack('click_deal_card', {
      dealId,
    })
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
            <span className="inlin-block ml-1">새로고침</span>
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
                <div key={section.name} className={sectionIdx === 0 ? undefined : 'pt-10'}>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">
                      {section.name}
                    </legend>
                    <div className="space-y-3 pt-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.label} className="flex items-center">
                          <input
                            id={`${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={() => {
                              onChangeFilter(section.id, option.value)
                            }}
                            checked={
                              !!currentFilters.find(
                                (filter) =>
                                  filter.id === section.id &&
                                  filter.options.find((currentOption) => {
                                    if (
                                      typeof currentOption.value === 'object' &&
                                      currentOption.value &&
                                      option.value
                                    ) {
                                      return (
                                        currentOption.value[0] === option.value[0] &&
                                        currentOption.value[1] === option.value[1]
                                      )
                                    } else {
                                      return currentOption.value === option.value
                                    }
                                  })
                              )
                            }
                          />
                          <label
                            htmlFor={`${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
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
            {isFetching && !isFetchingNextPage ? (
              Array.from({ length: 6 }).map((_, index) => (
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
            ) : (
              <>
                {(modelId == 2 || !modelType) &&
                  adDeals.map((deal) => <AdDealCard key={deal.id} deal={deal} />)}

                {deals?.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        clickHandler={() => {
                          onClickDealCard(deal.id)
                        }}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>

          {isFetchingNextPage && (
            <div role="status" className="mt-5 flex justify-center">
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
        </div>
      </div>

      {hasNextPage && !isFetching && (
        <div
          role="status"
          className="mt-5 flex h-[20px] justify-center lg:mt-8"
          ref={setRef as any}
        ></div>
      )}
      {/* <HotdealBanner
        currentFilter={currentFilters.find((filter) => filter.id === 'model')?.options[0]}
      /> */}
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
                    <div key={section.name} className="border-t border-gray-200 pb-4 pt-4">
                      <fieldset>
                        <legend className="w-full px-2">
                          <div className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              {section.name}
                            </span>
                          </div>
                        </legend>
                        <div className="px-4 pb-2 pt-4">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.label} className="flex items-center">
                                <input
                                  id={`${section.id}-${optionIdx}-mobile`}
                                  name={`${section.id}[]`}
                                  checked={
                                    !!currentFilters.find(
                                      (filter) =>
                                        filter.id === section.id &&
                                        filter.options.find((currentOption) => {
                                          if (
                                            typeof currentOption.value === 'object' &&
                                            currentOption.value &&
                                            option.value
                                          ) {
                                            return (
                                              currentOption.value[0] === option.value[0] &&
                                              currentOption.value[1] === option.value[1]
                                            )
                                          } else {
                                            return currentOption.value === option.value
                                          }
                                        })
                                    )
                                  }
                                  onChange={() => {
                                    onChangeFilter(section.id, option.value)
                                  }}
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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

export async function getServerSideProps(context) {
  const { model = null, source = null, sort = null } = context.query

  return {
    props: {
      model,
      source,
      sort,
    },
  }
}
