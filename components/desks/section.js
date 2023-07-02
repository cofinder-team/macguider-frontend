import React, { useCallback, useState } from 'react'
import amplitude from 'amplitude-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import optionsMac from '@/data/options/mac'
import { getPrices } from 'pages/buyers-guide'
import useAsyncAll from 'hooks/useAsyncAll'
import Skeleton from 'react-loading-skeleton'
import optionsIpad from '@/data/options/ipad'

export default function DeskSection({ deskId, section }) {
  const { id: sectionId, images, productInfo, desc, appleProducts } = section
  // state for selectedImage in each section
  const [selectedImage, setSelectedImage] = useState(images[0])

  const { id: selectedImageId, src, alt } = selectedImage

  const onClickImage = useCallback(
    (image) => {
      amplitude.getInstance().logEvent('click_view_desk_image', { deskId, sectionId, imgSrc: src })
      setSelectedImage(image)
    },
    [sectionId, deskId, src]
  )

  const onClickPurchaseAccessory = useCallback(
    (accessoryId, link) => {
      amplitude.getInstance().logEvent('click_buy_accessory', {
        deskId,
        sectionId,
        accessoryId,
      })

      window.open(link, '_blank')
    },
    [deskId, sectionId]
  )

  const onClickAppleProduct = useCallback(
    (itemId, optionId, href) => {
      amplitude.getInstance().logEvent('click_show_more_price_info_desk', {
        deskId,
        sectionId,
        itemId,
        optionId,
      })

      window.open(href, '_blank')
    },
    [deskId, sectionId]
  )

  const getAppleProductInfo = useCallback((id, optionId, category) => {
    const target = category === 'mac' ? optionsMac : optionsIpad

    const product = target
      .find((e) => e.id === id)
      ?.data.find((spec) => spec.options.map((option) => option.id).includes(optionId))

    return product
  }, [])

  // 가격 조회
  const [state, refetch] = useAsyncAll(
    getPrices,
    appleProducts.map((product) => [product.id, product.optionId, false]),
    []
  )
  const { loading, data: fetchedData, error } = state

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
                className={`aspect-w-1 aspect-h-1 cursor-pointer overflow-hidden rounded-lg border-2 ${
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
          {appleProducts.map(({ id, optionId, category }, index) => {
            const { title, imgSrc, specs, href } = getAppleProductInfo(id, optionId, category)

            return (
              <li key={`${id}-${optionId}`} className="relative flex w-full justify-between py-5">
                <div className="flex max-w-[65%] gap-x-4 pr-6 sm:w-1/2 sm:flex-none ">
                  <img
                    className="h-12 w-12 flex-none rounded-md bg-gray-50 object-contain"
                    src={imgSrc}
                    alt={title}
                  />
                  <div className="min-w-0 flex-auto truncate">
                    <p className="truncate text-sm font-semibold leading-6 text-gray-900">
                      {title}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{specs.cpu}</p>
                  </div>
                </div>

                {loading || !fetchedData ? (
                  <Skeleton width={'5rem'} height="2rem" borderRadius="0.5rem" />
                ) : (
                  <button
                    onClick={() => {
                      onClickAppleProduct(id, optionId, href)
                    }}
                    className="flex h-fit items-center rounded-lg  border border-blue-700 bg-blue-800  px-3 py-2 text-center text-sm font-medium text-white hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-4  "
                  >
                    <strong>{Math.floor(fetchedData[index].data.slice(-1)[0]?.mid / 10000)}</strong>
                    <span className="ml-0.5 inline-block"> 만원부터</span>

                    <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                  </button>
                )}

                {/* <button
                  onClick={() => {
                    onClickAppleProduct(id, optionId)
                  }}
                  className="flex h-fit items-center rounded-lg  border border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white "
                >
                  <strong>{160}</strong>
                  <span className="ml-0.5 inline-block"> 만원부터</span>

                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </button> */}
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
