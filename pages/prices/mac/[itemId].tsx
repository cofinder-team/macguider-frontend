import { PageSEO } from '@/components/SEO'
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { useScreenSize } from 'hooks/useScreenSize'
import 'react-loading-skeleton/dist/skeleton.css'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Feedback from '@/components/Feedback'
import PricesLayout from '@/layouts/PricesLayout'
import { useQuery } from 'react-query'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import TradePrices from '@/components/prices/trade'
import { getItem } from 'utils/item'
import NewPrices from '@/components/prices/new'
import PriceGraph from '@/components/prices/graph'
import SelectOptionsModal from '@/components/modal/SelectOptions'
import { getModel } from 'utils/model'

interface PageProps {
  newId: number
}

const MacModel = ({ newId }: PageProps) => {
  const modalRef = useRef<HTMLDivElement>(null) as any
  const layoutRef = useRef<HTMLDivElement>(null) as any

  const { md } = useScreenSize()

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

  // 모델 조회
  const {
    isLoading: loadingCurrentModel,
    error: errorCurrentModel,
    data: currentModel,
  } = useQuery(['model', 'M', itemId], () => getModel('M', currentItem!.model.id), {
    enabled: !!currentItem,
  })

  if (errorCurrentItem || errorCurrentModel) {
    alert('데이터 조회에 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  const [unused, setUnused] = useState(false)
  const [source, setSource] = useState<Source>('전체')

  const onClickOption = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.setOpen(true)
    }
  }, [])

  const changeModelOptions = useCallback((item: ItemResponse) => {
    amplitudeTrack('click_change_options', {
      type: 'M',
      id: item.id,
    })

    setItemId(item.id)
  }, [])

  return (
    <>
      <PageSEO title={'오늘의 Mac 시세'} description={'중고 맥 시세를 알려드립니다'} />

      {currentModel && currentItem && (
        <>
          <SelectOptionsModal
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
              {`${currentItem.details.year} ${currentItem.model.name} ${currentItem.details.chip}`}
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
                        {`${currentItem.details.cpu}코어 / ${currentItem.details.gpu}코어 / ${currentItem.details.ssd} / ${currentItem.details.ram}GB`}
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
                model={currentModel}
                item={currentItem}
                unused={unused}
                setUnused={setUnused}
                source={source}
                setSource={setSource}
              />
              <NewPrices model={currentModel} item={currentItem} />
              <PriceGraph item={currentItem} unused={unused} source={source} />

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
  const { itemId: newId } = context.query

  try {
    await getItem<MacItemResponse>('M', newId)
  } catch {
    return {
      redirect: {
        destination: '/prices/mac/1',
        permanent: true,
      },
    }
  }

  return {
    props: {
      newId,
    },
  }
}

export default MacModel
