import { useCallback } from 'react'
import Link from '@/components/Link'
import React from 'react'

export default function DealCard({ deal, clickHandler }) {
  const { id, item, price, source, sold, unused, average } = deal

  const getDiscountPercentage = useCallback((price, avgPrice) => {
    return Math.round((1 - price / avgPrice) * 100)
  }, [])

  return (
    <Link
      href={`/deals/${id}`}
      className="flex h-[120px] w-full cursor-pointer items-center overflow-hidden  bg-white"
      onClick={clickHandler}
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
          <span className="mr-1 inline-block  font-semibold text-gray-700">{source}</span>
          {item.type === 'M'
            ? `CPU ${item.details.cpu} GPU ${item.details.gpu}, RAM ${item.details.ram}GB, SSD ${item.details.ssd}`
            : `${item.details.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'} (${item.details.storage})`}
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
  )
}
