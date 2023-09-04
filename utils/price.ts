import axiosInstance, { axiosInstanceV2 } from '@/lib/axios'
import { ModelType } from './model'

export type Source = '중고나라' | '번개장터' | '당근마켓'

interface TradePriceResponse {
  date: Date
  average: number | null
  price_20: number | null
  price_80: number | null
  cnt: string
}

interface PriceResponse {
  date: Date
  price: number | null
  log: Date | null // 품절, 단종 여부 판단
}

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
  source: Source = '중고나라'
): Promise<TradePriceResponse> {
  const response = await axiosInstanceV2.get(`/price/trade/${type}/${itemId}/recent`, {
    params: {
      unused,
      source,
    },
  })
  return response.data
}

// 최근 1년간 거래 가격 조회
export async function getTotalTradePrice(
  type: ModelType = 'M',
  itemId: number,
  unused = false,
  source: Source = '중고나라'
): Promise<TradePriceResponse[]> {
  const response = await axiosInstanceV2.get(`/price/trade/${type}/${itemId}`, {
    params: {
      unused,
      source,
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
