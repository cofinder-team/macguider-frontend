import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import amplitudeTrack from '@/lib/amplitude/track'
import { getItem } from 'utils/item'
import { getModelType } from '@/lib/utils/model'
import { ItemDetail } from '@/components/items/ItemDetail'

export default function DeskSection({ deskId, section }) {
  const { id: sectionId, images, productInfo, desc, appleProducts } = section
  // state for selectedImage in each section
  const [selectedImage, setSelectedImage] = useState(images[0])

  const { id: selectedImageId, src, alt } = selectedImage

  const onClickImage = useCallback(
    (image) => {
      amplitudeTrack('click_view_desk_image', { deskId, sectionId, imgSrc: src })
      setSelectedImage(image)
    },
    [sectionId, deskId, src]
  )

  const onClickPurchaseAccessory = useCallback(
    (accessoryId, link) => {
      amplitudeTrack('click_buy_accessory', {
        deskId,
        sectionId,
        accessoryId,
      })

      window.open(link, '_blank')
    },
    [deskId, sectionId]
  )

  const onClickAppleProduct = useCallback(
    (type, itemId) => {
      amplitudeTrack('click_show_more_price_info_desk', {
        deskId,
        sectionId,
        type,
        itemId,
      })

      window.open(`/prices/${getModelType(type)}/${itemId}`, '_blank')
    },
    [deskId, sectionId]
  )

  const [appleProductInfo, setAppleProductInfo] = useState<
    (MacItemResponse | IpadItemResponse | IphoneItemResponse)[]
  >([])

  useEffect(() => {
    Promise.all(
      [...appleProducts].map(({ type, itemId }: { type: ModelType; itemId: number }) =>
        getItem<MacItemResponse>(type, itemId)
      )
    )
      .then((res) => {
        setAppleProductInfo(res)
      })
      .catch(() => {
        alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
      })
  }, [appleProducts])

  return (
    <div>
      <div className="grid gap-4">
        <div className="relative h-[280px] md:h-[420px]">
          <div className="relative h-full w-full overflow-hidden rounded-lg ">
            <img className="h-full w-full object-cover" src={src} alt={alt} draggable="false" />
          </div>
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => {
                  onClickImage(image)
                }}
                className={`aspect-h-1 aspect-w-1 cursor-pointer overflow-hidden rounded-lg border-2 ${
                  selectedImageId === image.id ? 'border-blue-800' : 'border-transparent'
                }`}
              >
                <img
                  className="h-full w-full object-contain object-cover"
                  src={image.src}
                  alt={image.alt}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6">{desc}</p>

      <div className="mt-6">
        <h3 className="text-xl font-bold">사진 속 제품들</h3>

        <ul role="list" className="divide-y divide-gray-100">
          {appleProductInfo.map((item) => {
            return (
              <li
                key={`${item.type}-${item.id}`}
                className="relative flex w-full justify-between py-5"
              >
                <div className="flex max-w-[65%] gap-x-4 pr-6 sm:w-1/2 sm:flex-none ">
                  <img
                    className="h-12 w-12 flex-none rounded-md bg-gray-50 object-contain"
                    src={item.image.url}
                    alt={item.model.name}
                  />
                  <div className="min-w-0 flex-auto truncate">
                    <ItemDetail
                      item={item}
                      mainClass="truncate text-sm font-semibold leading-6 text-gray-900"
                      detailClass="mt-1 truncate text-xs leading-5 text-gray-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClickAppleProduct(item.type, item.id)
                  }}
                  className="flex h-fit items-center rounded-lg  border border-blue-700 bg-blue-800  px-3 py-2 text-center text-sm font-medium text-white hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-4 "
                >
                  <span className="ml-0.5 inline-block">적정 중고가격</span>

                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </button>
              </li>
            )
          })}
          {productInfo.map(({ id: productId, title, category, src, alt, link }) => (
            <li key={productId} className="relative flex w-full items-center justify-between py-5">
              <div className="flex max-w-[75%] gap-x-4 pr-6 sm:w-1/2 sm:flex-none ">
                <img
                  className="h-12 w-12 flex-none rounded-md bg-gray-50 object-contain"
                  src={src}
                  alt={alt}
                />
                <div className="min-w-0 flex-auto truncate">
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">{category}</p>
                  <p className="truncate text-sm font-semibold leading-6 text-gray-900">{title}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClickPurchaseAccessory(productId, link)
                }}
                className="flex h-fit items-center rounded-lg  border border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white "
              >
                구매하기
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
