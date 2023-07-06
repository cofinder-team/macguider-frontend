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
import NewsletterForm from '@/components/NewsletterForm'
import { pastTime } from '@/lib/utils/pastTime'
import Promo from '@/components/Promo'
import { getPrices } from 'utils/price'
import { getAppleProductInfo } from 'utils/model'
import amplitudeTrack from '@/lib/amplitude/track'
import Modal from '@/components/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faCircleExclamation,
  faPaperPlane,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import CoupangLogo from '@/data/coupang_logo.svg'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'

const leftColumnOffsetY = 150
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]
const people = [
  {
    name: 'M2324',
    title: '2022.03.12',
    email: '블루, 오렌지, 레드',
  },
  // More people...
]

const MacModel = ({ model, optionId }) => {
  const container = useRef(null)
  const leftColumn = useRef(null)
  const [fixedElementWidth, setFixedElementWidth] = useState(0)
  const modalRef = useRef(null)

  useEffect(() => {
    amplitudeTrack('enter_price_detail', { item_class: 'mac', item_detail: model })

    let lastScrollTop = 0

    const handleScroll = () => {
      if (container.current && leftColumn.current) {
        let st = window.pageYOffset || document.documentElement.scrollTop

        if (st > lastScrollTop) {
          // when scroll down
          if (
            leftColumn.current.getBoundingClientRect().bottom >=
            container.current.getBoundingClientRect().bottom
          ) {
            leftColumn.current.classList.add('md:absolute', 'md:bottom-0')
            leftColumn.current.classList.remove('md:fixed', `md:top-[${leftColumnOffsetY}px]`)
          } else {
            leftColumn.current.classList.add('md:fixed', `md:top-[${leftColumnOffsetY}px]`)
            leftColumn.current.classList.remove('md:absolute', 'md:bottom-0')
          }
        } else {
          // when scroll up
          if (
            leftColumn.current.getBoundingClientRect().top >= leftColumnOffsetY &&
            leftColumn.current.getBoundingClientRect().bottom ===
              container.current.getBoundingClientRect().bottom
          ) {
            leftColumn.current.classList.add('md:fixed', `md:top-[${leftColumnOffsetY}px]`)
            leftColumn.current.classList.remove('md:absolute', 'md:bottom-0')
          }
        }
        lastScrollTop = st <= 0 ? 0 : st
      }
    }

    const updateFixedElementWidth = () => {
      const isMobile = window.innerWidth <= 768

      if (leftColumn.current && leftColumn.current.parentNode) {
        if (isMobile) {
          const parentWidth = leftColumn.current.parentNode.offsetWidth
          setFixedElementWidth(parentWidth)
        } else {
          const parentWidth = leftColumn.current.parentNode.offsetWidth
          const newWidth = parentWidth * 0.5 // Set to 50% of parent width

          setFixedElementWidth(newWidth)
        }
      }
    }

    updateFixedElementWidth()
    window.addEventListener('resize', updateFixedElementWidth)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', updateFixedElementWidth)
      window.removeEventListener('scroll', handleScroll)
    }
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
  const initialModel = optionId
    ? getAppleProductInfo(currentItemId, Number(optionId), 'mac')
    : currentItemData[0]

  const { sm, md, lg } = useScreenSize()

  // currentItem > currentModel > currentOption
  const [currentModel, setCurrentModel] = useState(initialModel)
  const { title: modelTitle, specs, options, imgSrc, href } = currentModel

  const initialOption = optionId
    ? currentModel.options.find((option) => option.id === Number(optionId))
    : currentModel.options[0]
  const [currentOption, setCurrentOption] = useState(initialOption)

  const { ram: currentOptionRam, ssd: currentOptionSsd, id: currentOptionId } = currentOption
  const [unopened, setUnopened] = useState('false')

  // 가격 조회
  const [state, refetch] = useAsync(getPrices, [currentItemId, options[0].id, unopened], [])
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

  const onClickOption = () => {
    if (modalRef.current) {
      modalRef.current.setOpen(true)
      modalRef.current.initializeOptions()
    }
  }

  const changeModelOptions = (optionId) => {
    // find selected Model which contains optionId
    const selectedModel = currentItemData.find((model) =>
      model.options.some((option) => option.id === optionId)
    )

    // find selected Option
    const selectedOption = selectedModel.options.find((option) => option.id === optionId)

    setCurrentModel(selectedModel)
    setCurrentOption(selectedOption)
    fetchPriceData(currentItemId, optionId, unopened)

    amplitudeTrack('click_change_option', {
      item_class: 'mac',
      item_detail: model,
      option_value: selectedModel.specs,
    })
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

    amplitudeTrack('click_select_option', {
      item_class: 'mac',
      item_detail: model,
      option_type: 'cpu',
      option_value: selectedModel.specs,
    })
  }

  const onInputPlatform = (platform) => {
    if (platform !== '중고나라') {
      alert('준비 중입니다. 이메일을 등록해주시면 가장 먼저 알려드릴게요!')
      amplitudeTrack('click_change_platform', {
        platform,
      })
    }
  }

  // 미개봉 상태 변경
  const onInputOptionUnopened = (status) => {
    setUnopened(status)
    fetchPriceData(currentItemId, currentOptionId, status)

    amplitudeTrack('click_select_option', {
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

    amplitudeTrack('click_select_option', {
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

      <Modal
        ref={modalRef}
        currentItem={currentItem}
        currentModel={currentModel}
        currentOption={currentOption}
        onApply={changeModelOptions}
      />

      <div ref={container} className="container relative md:pt-6">
        <div
          ref={leftColumn}
          className={`md:fixed md:top-[${leftColumnOffsetY}px] `}
          style={{
            // 처음 마운트시 fixedElementWidth가 0이므로 visibility를 hidden으로 설정
            width: fixedElementWidth,
            visibility: fixedElementWidth ? 'visible' : 'hidden',
          }}
        >
          <Image
            alt={`${specs.year} ${modelTitle} 이미지`}
            src={imgSrc}
            width={576}
            height={306}
            priority="true"
            objectFit="contain"
            objectPosition="center"
          />

          {md && (
            <div className="flex justify-center md:px-10">
              <div className="inline-flex items-center justify-center rounded-lg bg-gray-50  p-5 text-base font-medium text-gray-700">
                <span className="font-semibold">정보가 도움이 되었나요?</span>
                <HandThumbUpIcon className="ml-4 h-6 w-6 fill-blue-300" />
                <HandThumbDownIcon className="ml-2 h-6 w-6" />
              </div>
            </div>
          )}

          {/* <ul className="mb-8 mt-2 space-y-1 text-left text-gray-500 dark:text-gray-400">
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
                <span className="font-semibold text-gray-900 dark:text-white">{pastTime()}</span>
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
                <span className="font-semibold text-gray-900 dark:text-white">끌어올린글 제외</span>
              </span>
            </li>
          </ul> */}
        </div>

        <div className="ml-auto flex-grow md:w-1/2 md:px-3">
          <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-2xl">
            {`${specs.year} ${modelTitle}`}
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

                {/* <select
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
                </select> */}
              </div>

              {/* <ul className="mt-3 flex w-full  max-w-xl flex-wrap items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
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
              </ul> */}

              {/* <div className="grid max-w-md grid-cols-2 gap-2 py-5">
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
              </div> */}
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
                        onInput={(e) => onInputOptionCPU(e.target.value)}
                        value={currentItemData.indexOf(currentModel)}
                      >
                        {currentItemData.map((model, index) => (
                          <option key={model.specs.cpu} value={index}>
                            S급
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:pb-4">
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
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('mid') ? (
                        <>
                          <span>{getPriceByLevel('mid').toLocaleString()}</span>
                          <span className="ml-1 font-normal">원</span>
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

                    <div>
                      <div className="mb-1 text-right text-base font-semibold text-gray-900 dark:text-white">
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
                      <div className="text-right text-base font-semibold text-gray-900 dark:text-white">
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

              <div className="max-w-md cursor-pointer rounded bg-pink-50  py-3 sm:py-4">
                <div className="flex items-center space-x-4 pr-2">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1 ">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      구매시기 가이드
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      지금 중고로 사도 괜찮을까요?
                    </p>
                  </div>
                  <div className="inline-flex cursor-pointer items-center rounded-md  px-2 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                    경고
                    <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-md font-bold text-gray-900 dark:text-white">새제품 정보</p>

              <ul className="mt-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        출시가
                      </p>
                    </div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('mid') ? (
                        <>
                          <span>{getPriceByLevel('mid').toLocaleString()}</span>
                          <span className="ml-1 font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
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
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {loading || !fetchedData ? (
                        <Skeleton width={md ? '8rem' : '5rem'} borderRadius="0.5rem" />
                      ) : getPriceByLevel('mid') ? (
                        <>
                          <span>{getPriceByLevel('mid').toLocaleString()}</span>
                          <span className="ml-1 font-normal">원</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
              <div className="max-w-md cursor-pointer rounded bg-pink-50  py-3 sm:py-4">
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
                  <div className="inline-flex cursor-pointer items-center rounded-md  px-2 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                    경고
                    <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
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
                        data: fetchedData.data.map((price, _index) =>
                          price.mid ? price.mid : null
                        ),
                      },
                    ],
                  }}
                />
              )}
            </div>

            <div className="mt-5">
              <p className="text-md font-bold text-gray-900 dark:text-white">제품 정보</p>

              <div className="mt-2 flow-root">
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full align-middle ">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr className="divide-x divide-gray-200">
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            모델번호
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                        {people.map((person) => (
                          <tr key={person.email} className="divide-x divide-gray-200">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                              {person.name}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                              {person.title}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                              {person.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* <ul class="rf-configuration-subheader typography-body-reduced">
                <li>Apple M2 칩(8코어 CPU, 10코어 GPU, 16코어 Neural Engine)</li>
                <li>8GB 통합 메모리</li>
                <li>256GB SSD 저장 장치</li>
                <li>True Tone을 갖춘 38.9cm Liquid Retina 디스플레이³</li>
                <li>1080p FaceTime HD 카메라</li>
                <li>MagSafe&nbsp;3 충전 포트</li>
                <li>Thunderbolt/USB&nbsp;4 포트 2개</li>
                <li>35W 듀얼 USB-C 포트 전원 어댑터</li>
                <li>백라이트 Magic Keyboard(Touch ID 탑재) - 한국어</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t py-10 md:mt-24 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">다른 제품 둘러보기</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Promo />

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
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
