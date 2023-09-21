interface ItemResponse {
  type: ModelType
  id: number
  model: ModelResponse
  option: number
  details: ItemDetailsResponse
  image: {
    url: string
  }
}

// 모델의 대표 아이템
interface MainItemResponse extends ModelResponse {
  mainItem: {
    type: ModelType
    id: number
    image: {
      url: string
    }
  }
  histories: {
    date: Date
    info: string
  }[]
}

interface MacItemResponse extends ItemResponse {
  details: MacItemDetailsResponse
}

interface IpadItemResponse extends ItemResponse {
  details: IpadItemDetailsResponse
}

interface IphoneItemResponse extends ItemResponse {
  details: IphoneItemDetailsResponse
}

interface ItemDetailsResponse {
  year: number
  releasedAt: string
  colors: string[]
}

interface MacItemDetailsResponse extends ItemDetailsResponse {
  chip: string
  cpu: number
  gpu: number
  ram: number
  ssd: string
}

interface IpadItemDetailsResponse extends ItemDetailsResponse {
  storage: string
  gen: number
  cellular: boolean
  chip: string
}

interface IphoneItemDetailsResponse extends ItemDetailsResponse {
  modelSuffix: 'DEFAULT' | 'PRO' | 'PLUS' | 'PROMAX' | 'MINI'
  storage: string
}
