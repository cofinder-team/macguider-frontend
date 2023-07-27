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

const categories = ['Mac', 'iPad']

const filters = [
  {
    id: 'source',
    name: '중고 플랫폼',
    options: [
      { value: 'joongonara', label: '중고나라' },
      { value: 'bunjang', label: '번개장터' },
    ],
  },
  {
    id: 'model',
    name: '제품',
    options: optionsMac
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
  },
]

const initialFilters = filters.map((filter) => ({
  ...filter,
  options: filter.id === 'source' ? [filter.options[0]] : [],
}))

const sortOptions = [
  { name: '할인율이 높은 순', href: '#', current: false },
  { name: '최신 순', href: '#', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Deals() {
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [currentSort, setCurrentSort] = useState(sortOptions[0])
  const [currentFilters, setCurrentFilters] = useState(initialFilters)

  // const [currentDeals, setCurrentDeals] = useState([])
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date())
  const [visibleLastUpdatedTime, setVisibleLastUpdatedTime] = useState()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [state, refetch] = useAsync(getDeals, [], [])
  const { loading, data: deals, error } = state

  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  useEffect(() => {
    amplitudeTrack('enter_page_deals')
  }, [])

  // useEffect(() => {
  //   if (deals) {
  //     if (currentCategory === 'Mac') {
  //       setCurrentDeals(deals.filter(({ item }) => item.type === 'M'))
  //     } else {
  //       setCurrentDeals(deals.filter(({ item }) => item.type !== 'M'))
  //     }
  //   }
  // }, [currentCategory, deals])

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

  const onChangeFilter = useCallback(
    (sectionId, value) => {
      if (sectionId === 'source') {
        if (value !== 'joongonara') {
          alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')
          return
        }
      }
      setCurrentFilters(
        currentFilters.map((filter) => {
          if (filter.id === 'model') {
            return {
              ...filter,
              options: filters
                .find((f) => f.id === 'model')
                .options.filter((option) => option.value === value),
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

  const onClickCategory = useCallback((category) => {
    setCurrentCategory(category)
    amplitudeTrack('click_change_category', {
      category,
    })
  }, [])

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
      <p className="font-base text-sm text-gray-500">시세보다 저렴한 중고 애플 제품을 모아왔어요</p>
      <div className="mt-4 text-sm font-medium ">
        <div className="-mx-4 flex items-center justify-between bg-gray-100 p-4 text-gray-600">
          <div>
            평균 중고 시세보다&nbsp;
            {/* <span className="font-bold text-gray-700">{currentCategory}&nbsp;</span> */}
            저렴한 제품들이에요
          </div>

          <div className="flex cursor-pointer items-center " onClick={onClickHandleReload}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="inlin-block ml-1">{visibleLastUpdatedTime}</span>
          </div>
        </div>
      </div>

      {/* PC 정렬 */}
      <div className="hidden w-full pt-6 lg:flex">
        <Menu as="div" className="relative ml-auto inline-block">
          <div className="flex">
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              정렬
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <a
                        href={option.href}
                        className={classNames(
                          option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {option.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="pt-3 md:pt-6 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">필터</h2>

          {/* 모바일 필터 및 정렬 */}
          <div className="flex justify-between lg:hidden">
            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">필터</span>
              <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </button>
            <Menu as="div" className="relative inline-block ">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  정렬
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

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
                      {section.options.map((option, optionIdx) => (
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
            {loading || !deals
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
              : deals.map(({ id, source, price, sold, unused, url, item, average }) => (
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
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
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

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 pb-4 pt-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? '-rotate-180' : 'rotate-0',
                                    'h-5 w-5 transform'
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pb-2 pt-4">
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
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
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
