type Source = '전체' | '중고나라' | '번개장터' | '당근마켓'

interface DealResponse {
  type: ModelType
  id: number
  item: ItemResponse
  date: Date
  price: number
  sold: boolean
  unused: boolean
  source: Source
  url: string
  regularPrice: PriceResponse
  coupangPrice: PriceResponse
  tradePrice: TradePriceResponse
}
