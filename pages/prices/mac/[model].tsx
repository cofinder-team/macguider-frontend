import { PageSEO } from '@/components/SEO'
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react'
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
import TradePrices from '@/components/prices/trade'
import { getItem } from 'utils/item'
import NewPrices from '@/components/prices/new'
import PriceGraph from '@/components/prices/graph'
import SelectOptions from '@/components/modal/SelectOptions'

interface PageProps {
  model: string
  newId: number
}

const MacModel = ({ model, newId }: PageProps) => {
  const modalRef = useRef(null) as any
  const layoutRef = useRef(null) as any

  const { md } = useScreenSize()
  const router = useRouter()

  useEffect(() => {
    amplitudeTrack('enter_price_detail', { type: 'M', id: newId })
  }, [])

  // 신규 itemId
  const [itemId, setItemId] = useState(newId)

  const {
    isLoading: loadingCurrentItem,
    error: errorCurrentItem,
    data: currentItem,
  } = useQuery(['item', 'M', itemId], () => getItem<MacItemResponse>('M', itemId))

  // let currentModel: MacModel

  // switch (model) {
  //   case 'mac-mini':
  //     currentModel = optionsMac.find((m) => m.id === '1') as MacModel
  //     break
  //   case 'macbook-air-13':
  //     currentModel = optionsMac.find((m) => m.id === '2') as MacModel
  //     break
  //   case 'macbook-pro-13':
  //     currentModel = optionsMac.find((m) => m.id === '3') as MacModel
  //     break
  //   case 'macbook-pro-14':
  //     currentModel = optionsMac.find((m) => m.id === '4') as MacModel
  //     break
  //   case 'macbook-pro-16':
  //     currentModel = optionsMac.find((m) => m.id === '5') as MacModel
  //     break
  //   default:
  //     currentModel = optionsMac.find((m) => m.id === '1') as MacModel
  // }

  // const { data: currentModelData, id: currentModelId, releasedDateHistory } = currentModel
  // const initialItem: MacItem = optionId
  //   ? (getAppleProductInfo(currentModelId, Number(optionId), 'M') as MacItem)
  //   : currentModelData[0]

  // currentModel > currentItem > currentOption
  // const [currentItem, setCurrentItem] = useState(initialItem)
  // const { title: modelTitle, specs, isDeprecated, releasedDate, colors } = currentItem

  // const initialOption = (
  //   optionId
  //     ? currentItem?.options.find((option) => option.id === Number(optionId))
  //     : currentItem?.options[0]
  // ) as MacItemDetails
  // const [currentOption, setCurrentOption] = useState(initialOption)

  // const {
  //   ram: currentOptionRam,
  //   ssd: currentOptionSsd,
  //   id: currentOptionId,
  //   price: currentOptionPrice,
  // } = currentOption

  const [unused, setUnused] = useState(false)
  const [source, setSource] = useState<Source>('중고나라')

  const onClickOption = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.setOpen(true)
    }
  }, [])

  const changeModelOptions = useCallback(
    (item: ItemResponse) => {
      amplitudeTrack('click_change_options', {
        type: 'M',
        id: item.id,
      })

      setItemId(item.id)

      // find selected Model which contains optionId
      // const selectedItem = currentModelData.find((model) =>
      //   model.options.some((option) => option.id === optionId)
      // )

      // if (selectedItem) {
      //   // find selected Option
      //   const selectedOption = selectedItem.options.find(
      //     (option) => option.id === optionId
      //   ) as MacItemDetails

      //   setCurrentItem(selectedItem)
      //   setCurrentOption(selectedOption)
      //   // fetchPriceData(currentItemId, optionId, unopened)

      //   amplitudeTrack('click_change_options', {
      //     item_class: 'mac',
      //     item_detail: model,
      //     option_value: selectedItem.specs,
      //   })
    },
    [itemId]
  )

  // const daysSinceLastReleaseDate = useMemo(() => {
  //   const today = new Date()
  //   const [year, month, date] = releasedDateHistory[0].split('-')

  //   const daysSinceLastReleaseDate = Math.floor(
  //     (today.getTime() - new Date(Number(year), Number(month) - 1, Number(date)).getTime()) /
  //       (1000 * 60 * 60 * 24)
  //   )

  //   return daysSinceLastReleaseDate
  // }, [releasedDateHistory])

  return (
    <>
      <PageSEO title={'맥 시세'} description={'ChatGPT가 알려주는 사양별 맥 시세'} />

      {/* <OptionsModalForMac
        ref={modalRef}
        currentModel={currentModel}
        currentItem={currentItem}
        currentOption={currentOption}
        onApply={changeModelOptions}
      /> */}
      {currentItem && (
        <>
          <SelectOptions
            ref={modalRef}
            modelId={currentItem.model.id}
            modelType={currentItem.type}
            itemId={currentItem.id}
            onApply={(item) => {
              changeModelOptions(item)
            }}
          />
          <PricesLayout item={currentItem} ref={layoutRef}>
            <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-2xl">
              {`연도 ${currentItem.model.name} ${currentItem.details.chip}`}
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
                        {`${currentItem.details.cpu}코어 / ${currentItem.details.gpu}코어 / ${currentItem.details.ssd} / ${currentItem.details.ram}`}
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

              <TradePrices
                item={currentItem}
                unused={unused}
                setUnused={setUnused}
                source={'중고나라'}
                setSource={setSource}
              />
              <NewPrices item={currentItem} />
              <PriceGraph item={currentItem} unused={false} source={'중고나라'} />

              {!md && (
                <div className="mt-10 inline-flex w-full items-center justify-center rounded-lg bg-gray-100  p-5 text-base font-medium text-gray-700">
                  <Feedback item={currentItem} />
                </div>
              )}
            </div>
          </PricesLayout>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { model, optionId = null } = context.query
  let newId: number

  if (optionId) {
    newId = Number(optionId)
  } else {
    switch (model) {
      case 'mac-mini':
        newId = 1
        break
      case 'macbook-air-13':
        newId = 21
        break
      case 'macbook-pro-13':
        newId = 45
        break
      case 'macbook-pro-14':
        newId = 47
        break
      case 'macbook-pro-16':
        newId = 93
        break
      case 'macbook-air-15':
        newId = 117
        break
      default:
        newId = 1
        break
    }
  }

  return {
    props: {
      model,
      newId,
    },
  }
}

export default MacModel
