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
