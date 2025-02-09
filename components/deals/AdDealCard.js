import { useCallback } from 'react'
import Link from '@/components/Link'
import React from 'react'
import Logo from '@/data/logo.svg'
import amplitudeTrack from '@/lib/amplitude/track'

export default function AdDealCard({ deal }) {
  const { id, item, price, source, sold, unused, average, url, imgSrc } = deal
  const onClickAdDealCard = useCallback(() => {
    amplitudeTrack('click_ad_deal_card', { id })
  }, [id])

  return (
    <Link
      href={url}
      className="flex h-[120px] w-full cursor-pointer items-center overflow-hidden  bg-white"
      onClick={onClickAdDealCard}
    >
      <div className="mr-2 flex-1 truncate">
        <div className="flex items-center truncate text-xs  font-medium text-gray-800">
          <div className="mr-2 -scale-x-100 text-[10px]">
            <Logo />
          </div>
          인증 제품
        </div>
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
          <span className="mr-1 inline-block  font-semibold text-gray-700">{source}</span>
          {item.type === 'M'
            ? `CPU ${item.details.cpu} GPU ${item.details.gpu}, RAM ${item.details.ram}GB, SSD ${item.details.ssd}`
            : `${item.details.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'} (${item.details.storage})`}
        </div>

        <div className=" flex items-center text-lg">
          <div className="font-bold text-gray-900">{price?.toLocaleString()}원</div>
        </div>
      </div>

      <div className="flex h-full w-1/4 max-w-[100px] items-center">
        <div className="relative aspect-1 overflow-hidden rounded-md">
          <img
            src={imgSrc}
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
  )
}
