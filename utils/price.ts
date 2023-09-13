import axiosInstance, { axiosInstanceV2 } from '@/lib/axios'
import { useMemo } from 'react'

// deprecated
export async function getPrices(
  itemId = 1,
  optionId = 1,
  unopened = false
): Promise<TradePriceResponse[]> {
  const response = await axiosInstance.get(`/item/${itemId}/option/${optionId}`, {
    params: {
      unopened,
    },
  })
  return response.data
}

// 가장 최신 시세정보 조회
export async function getRecentTradePrice(
  type: ModelType = 'M',
  itemId: number,
  unused = false,
  source: Source = '전체'
): Promise<TradePriceResponse> {
  const response = await axiosInstanceV2.get(`/price/trade/${type}/${itemId}/recent`, {
    params: {
      source: source === '전체' ? undefined : source,
      unused,
    },
  })
  return response.data
}

// 최근 1년간 거래 가격 조회
export async function getTotalTradePrice(
  type: ModelType = 'M',
  itemId: number,
  unused = false,
  source: Source = '전체'
): Promise<TradePriceResponse[]> {
  const response = await axiosInstanceV2.get(`/price/trade/${type}/${itemId}`, {
    params: {
      source: source === '전체' ? undefined : source,
      unused,
    },
  })
  return response.data
}

// 최신 쿠팡 가격 조회
export async function getRecentCoupangPrice(
  type: ModelType = 'M',
  itemId: number
): Promise<PriceResponse> {
  const response = await axiosInstanceV2.get(`/price/coupang/${type}/${itemId}/recent`)
  return response.data
}

// 최근 1년간 쿠팡 가격 조회
export async function getTotalCoupangPrice(
  type: ModelType = 'M',
  itemId: number
): Promise<PriceResponse[]> {
  const response = await axiosInstanceV2.get(`/price/coupang/${type}/${itemId}`)
  return response.data
}

// 최신 정가 조회
export async function getRecentRegularPrice(
  type: ModelType = 'M',
  itemId: number
): Promise<PriceResponse> {
  const response = await axiosInstanceV2.get(`/price/regular/${type}/${itemId}/recent`)
  return response.data
}

// 최근 1년간 정가 조회
export async function getTotalRegularPrice(
  type: ModelType = 'M',
  itemId: number
): Promise<PriceResponse[]> {
  const response = await axiosInstanceV2.get(`/price/regular/${type}/${itemId}`)
  return response.data
}

// 마지막 거래 데이터 조회 시간
export const getLastTradePriceUpdated = () => {
  const now = new Date()

  // Create a Date object for yesterday at 11 PM
  const yesterdayElevenPM = new Date()
  yesterdayElevenPM.setDate(now.getDate() - 1) // Go back one day
  yesterdayElevenPM.setHours(23, 0, 0, 0) // Set the time to 11:00:00 PM

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = now.getTime() - yesterdayElevenPM.getTime()

  // Convert the time difference to hours, minutes, and seconds
  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}시간 전`
  }
  if (minutes > 0) {
    return `${minutes}분 전`
  }
  return '방금 전'
}
